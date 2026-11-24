"""Gate, menstrual hygiene and albendazole registers."""

import json
import re
from datetime import date, timedelta
from pathlib import Path

from pymongo.asynchronous.database import AsyncDatabase

from app.core.config import get_settings
from app.db import collections
from app.models.registers import AlbendazoleCreate, GateEntryCreate, MenstrualHygieneCreate
from app.services.photos import decode_photo, save_photo
from app.services.repository import contains, insert_document, list_documents, new_id, next_sequence

# Unique registration ID given to every new gate register entry: PLW-000001, PLW-000002, ...
REGISTRATION_ID_PREFIX = "PLW"
GATE_PHOTO_URL = "/files/gate-photos"


def _is_filter(value: str | None) -> bool:
    return bool(value) and value != "All"


# Gate register
async def list_gate_register(db: AsyncDatabase, search: str | None, remark: str | None) -> list[dict]:
    query: dict = {}
    if search:
        pattern = contains(search)
        query["$or"] = [
            {"registrationId": pattern},
            {"visitorName": pattern},
            {"address": pattern},
            {"city": pattern},
            {"state": pattern},
            {"mobileNo": pattern},
            {"extraRemark": pattern},
        ]
    if _is_filter(remark):
        query["remarks"] = remark
    return await list_documents(db[collections.GATE_REGISTER], query)


def _mobile_digits(mobile: str | None) -> str:
    """Last 10 digits of a usable mobile number, or "" for blanks like "Not Provided" or "-"."""
    digits = re.sub(r"\D", "", mobile or "")
    return digits[-10:] if len(digits) >= 10 else ""


def _name_key(name: str | None) -> str:
    return " ".join((name or "").lower().split())


async def gate_visitor_history(db: AsyncDatabase, name: str, mobile: str | None) -> dict:
    """Every gate register visit by one person, newest first.

    Families often share one mobile number, so a visit counts as the same person when the
    name matches (ignoring case and spacing) and the mobile numbers match or one is missing.
    """
    key = _name_key(name)
    mobile_key = _mobile_digits(mobile)
    name_pattern = {"$regex": r"^\s*" + r"\s+".join(re.escape(part) for part in key.split()) + r"\s*$", "$options": "i"}
    same_name = await list_documents(db[collections.GATE_REGISTER], {"visitorName": name_pattern})
    visits = [
        entry
        for entry in same_name
        if not mobile_key or not _mobile_digits(entry.get("mobileNo")) or _mobile_digits(entry.get("mobileNo")) == mobile_key
    ]

    # Other people registered on the same number (usually family members).
    others: dict[str, dict] = {}
    if mobile_key:
        last_digits = {"$regex": re.escape(mobile_key[-6:])}
        for entry in await list_documents(db[collections.GATE_REGISTER], {"mobileNo": last_digits}):
            other_key = _name_key(entry.get("visitorName"))
            if other_key == key or _mobile_digits(entry.get("mobileNo")) != mobile_key:
                continue
            item = others.setdefault(other_key, {"name": entry.get("visitorName", "").strip(), "visits": 0})
            item["visits"] += 1

    return {
        "visits": visits,
        "sharedMobile": sorted(others.values(), key=lambda o: -o["visits"]),
    }


_MONTHS = ("jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec")
_VISIT_DATE = re.compile(r"^\s*(\d{1,2})-([A-Za-z]{3})[A-Za-z]*-(\d{2}|\d{4})\s*$")


def _parse_visit_date(value: str | None) -> date | None:
    """ "30-Sep-26" (also "30-Sept-26" or "30-Sep-2026") -> date, or None if it can't be read."""
    match = _VISIT_DATE.match(value or "")
    if not match or match[2].lower() not in _MONTHS:
        return None
    year = int(match[3]) + (2000 if len(match[3]) == 2 else 0)
    try:
        return date(year, _MONTHS.index(match[2].lower()) + 1, int(match[1]))
    except ValueError:
        return None


async def gate_visit_stats(db: AsyncDatabase, day: date) -> dict:
    """Gate register entries on `day`, in its week (Monday to `day`) and in its month (1st to `day`)."""
    week_start = day - timedelta(days=day.weekday())
    month_start = day.replace(day=1)
    start = min(week_start, month_start)
    # Only fetch entries from the months the counts can touch (dates are stored as "DD-Mon-YY").
    months = {(start.year, start.month), (day.year, day.month)}
    month_pattern = "|".join(f"{_MONTHS[m - 1]}[a-z]*-(?:{y % 100:02d}|{y})" for y, m in months)
    cursor = db[collections.GATE_REGISTER].find(
        {"date": {"$regex": rf"-(?:{month_pattern})\s*$", "$options": "i"}}, {"_id": 0, "date": 1}
    )
    counts = {"today": 0, "week": 0, "month": 0}
    async for entry in cursor:
        visit = _parse_visit_date(entry.get("date"))
        if not visit or visit > day:
            continue
        counts["today"] += visit == day
        counts["week"] += visit >= week_start
        counts["month"] += visit >= month_start
    return {**counts, "date": day.isoformat(), "weekStart": week_start.isoformat(), "monthStart": month_start.isoformat()}


_DOB = re.compile(r"^\s*(\d{1,2})\s*/\s*(\d{1,2})(?:\s*/\s*(\d{4}))?")


async def gate_birthdays(db: AsyncDatabase, day: date) -> list[dict]:
    """Gate register visitors whose birthday is on `day` (day and month), one row per person.

    Dates of birth are written day/month/year as in the paper register; the year is optional.
    """
    prefix = {"$regex": rf"^\s*0?{day.day}\s*/\s*0?{day.month}(\D|$)"}
    people: dict[tuple[str, str], dict] = {}
    # Newest first, so the first entry seen for a person holds their latest details.
    for entry in await list_documents(db[collections.GATE_REGISTER], {"dateOfBirth": prefix}):
        match = _DOB.match(entry.get("dateOfBirth") or "")
        if not match or (int(match[1]), int(match[2])) != (day.day, day.month):
            continue
        mobile = _mobile_digits(entry.get("mobileNo"))
        key = (_name_key(entry.get("visitorName")), mobile)
        if key in people:
            people[key]["visits"] += 1
            continue
        year = int(match[3]) if match[3] else None
        people[key] = {
            "name": (entry.get("visitorName") or "").strip(),
            "mobileNo": mobile or "",
            "dateOfBirth": entry.get("dateOfBirth"),
            "age": day.year - year if year and 1900 < year <= day.year else None,
            "address": entry.get("city") or entry.get("address") or "",
            "lastVisit": entry.get("date"),
            "visits": 1,
        }
    return sorted(people.values(), key=lambda p: p["name"].lower())


async def create_gate_entry(db: AsyncDatabase, payload: GateEntryCreate) -> dict:
    # Check the photo before taking a registration number, so a bad upload does not use one up.
    photo = decode_photo(payload.photo) if payload.photo else None
    registration_id = f"{REGISTRATION_ID_PREFIX}-{await next_sequence(db, collections.GATE_REGISTER):06d}"

    photo_url = None
    if photo:
        filename = await save_photo(db, photo, registration_id)
        photo_url = f"{GATE_PHOTO_URL}/{filename}"

    collection = db[collections.GATE_REGISTER]
    entry = {
        "id": new_id("gate"),
        "registrationId": registration_id,
        "srNo": await collection.count_documents({}) + 1,
        **payload.model_dump(exclude={"photo"}),
        "address": payload.address or payload.city or "Pandharpur",
        "date": payload.date or date.today().strftime("%d-%b-%y"),
        "photoUrl": photo_url,
    }
    return await insert_document(collection, entry)


# Menstrual hygiene register
async def list_menstrual_hygiene(db: AsyncDatabase, search: str | None, month: str | None) -> list[dict]:
    query: dict = {}
    if search:
        pattern = contains(search)
        fields = ["residentNameEn", "residentNameMr", "monthYear", "monthYearMr", "healthNotesEn", "healthNotesMr"]
        query["$or"] = [{field: pattern} for field in fields]
    if _is_filter(month):
        month_filter = {"$or": [{"monthYear": month}, {"monthYearMr": month}]}
        query = {"$and": [query, month_filter]} if query else month_filter
    return await list_documents(db[collections.MENSTRUAL_HYGIENE], query)


async def create_menstrual_hygiene_entry(db: AsyncDatabase, payload: MenstrualHygieneCreate) -> dict:
    collection = db[collections.MENSTRUAL_HYGIENE]
    entry = {"id": new_id("mhr"), "srNo": await collection.count_documents({}) + 1, **payload.model_dump()}
    return await insert_document(collection, entry)


# Albendazole register
async def list_albendazole(db: AsyncDatabase, search: str | None, status: str | None) -> list[dict]:
    query: dict = {}
    if search:
        pattern = contains(search)
        query["$or"] = [{"nameMr": pattern}, {"nameEn": pattern}, {"category": pattern}]
    if _is_filter(status):
        query["status"] = status
    return await list_documents(db[collections.ALBENDAZOLE], query)


async def create_albendazole_entry(db: AsyncDatabase, payload: AlbendazoleCreate) -> dict:
    collection = db[collections.ALBENDAZOLE]
    entry = {"id": new_id("alb"), "srNo": await collection.count_documents({}) + 1, **payload.model_dump()}
    return await insert_document(collection, entry)


# Scanned source registers (original PDFs)
_SEED_DATA = Path(__file__).resolve().parents[1] / "db" / "seed_data"
_REGISTER_DOCUMENTS = _SEED_DATA / "register_documents.json"
_TRANSCRIBED = _SEED_DATA / "transcribed"


def _transcription(doc_id: str) -> dict | None:
    """Typed-in data of a register as {note, tables:[{title?, titleMr?, note?, columns, rows}]}.

    A file holds either one table (top-level columns/rows) or several under "tables"
    (one scan can bind several registers together).
    """
    path = _TRANSCRIBED / f"{doc_id}.json"
    if not path.is_file():
        return None
    data = json.loads(path.read_text("utf-8"))
    if "tables" not in data:
        data = {"note": data.get("note"), "tables": [{"columns": data["columns"], "rows": data["rows"]}]}
    return data


def list_register_documents() -> list[dict]:
    """The manifest of scanned registers, with each file's URL and whether it is on disk."""
    files_dir = get_settings().register_files_dir
    documents = json.loads(_REGISTER_DOCUMENTS.read_text("utf-8"))
    result = []
    for doc in documents:
        path = files_dir / f"{doc['id']}.pdf"
        available = path.is_file()
        typed = _transcription(doc["id"])
        status = doc["status"]
        if typed and status == "scan":
            status = "complete"
        result.append({
            **{key: value for key, value in doc.items() if key != "source"},
            "fileName": doc["source"],
            "url": f"/files/registers/{doc['id']}.pdf",
            "available": available,
            "sizeBytes": path.stat().st_size if available else 0,
            "status": status,
            "entryCount": sum(len(t["rows"]) for t in typed["tables"]) if typed else 0,
        })
    return result


def get_register_entries(doc_id: str) -> dict | None:
    """Typed-in entries of one scanned register: its tables (columns and rows) and a transcription note."""
    if not re.fullmatch(r"[a-z0-9-]+", doc_id):
        return None
    return _transcription(doc_id)
