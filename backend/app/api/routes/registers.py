from datetime import date

from fastapi import APIRouter, HTTPException, status

from app.api.deps import Database
from app.models.registers import AlbendazoleCreate, GateEntryCreate, MenstrualHygieneCreate
from app.services import registers
from app.services.photos import InvalidPhotoError

router = APIRouter(tags=["registers"])


@router.get("/gate-register")
async def list_gate_register(db: Database, search: str | None = None, remark: str | None = None) -> list[dict]:
    return await registers.list_gate_register(db, search, remark)


@router.get("/gate-register/visitor-history")
async def gate_visitor_history(db: Database, name: str, mobile: str | None = None) -> dict:
    return await registers.gate_visitor_history(db, name, mobile)


@router.get("/gate-register/visit-stats")
async def gate_visit_stats(db: Database, on: date | None = None) -> dict:
    """Visit counts for the day `on` (YYYY-MM-DD; the caller's local date), its week and its month."""
    return await registers.gate_visit_stats(db, on or date.today())


@router.get("/gate-register/birthdays")
async def gate_birthdays(db: Database, on: date | None = None) -> list[dict]:
    """Visitors with a birthday on `on` (YYYY-MM-DD; the caller's local date). Defaults to today."""
    return await registers.gate_birthdays(db, on or date.today())


@router.post("/gate-register", status_code=status.HTTP_201_CREATED)
async def create_gate_entry(payload: GateEntryCreate, db: Database) -> dict:
    try:
        return await registers.create_gate_entry(db, payload)
    except InvalidPhotoError as exc:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=str(exc)) from exc


@router.get("/menstrual-hygiene")
async def list_menstrual_hygiene(db: Database, search: str | None = None, month: str | None = None) -> list[dict]:
    return await registers.list_menstrual_hygiene(db, search, month)


@router.post("/menstrual-hygiene", status_code=status.HTTP_201_CREATED)
async def create_menstrual_hygiene_entry(payload: MenstrualHygieneCreate, db: Database) -> dict:
    return await registers.create_menstrual_hygiene_entry(db, payload)


@router.get("/albendazole")
async def list_albendazole(db: Database, search: str | None = None, status: str | None = None) -> list[dict]:
    return await registers.list_albendazole(db, search, status)


@router.post("/albendazole", status_code=status.HTTP_201_CREATED)
async def create_albendazole_entry(payload: AlbendazoleCreate, db: Database) -> dict:
    return await registers.create_albendazole_entry(db, payload)


@router.get("/register-documents")
async def list_register_documents() -> list[dict]:
    return registers.list_register_documents()


@router.get("/register-documents/{doc_id}/entries")
async def get_register_entries(doc_id: str) -> dict:
    entries = registers.get_register_entries(doc_id)
    if entries is None:
        raise HTTPException(status_code=404, detail="No typed entries for this register yet")
    return entries
