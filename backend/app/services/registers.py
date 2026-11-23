"""Gate, menstrual hygiene and albendazole registers."""

import json
import re
from datetime import date
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
