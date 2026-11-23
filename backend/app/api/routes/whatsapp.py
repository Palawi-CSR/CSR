from fastapi import APIRouter, status

from app.api.deps import Database
from app.models.whatsapp import WhatsAppMessageCreate
from app.services import whatsapp

router = APIRouter(prefix="/whatsapp", tags=["whatsapp"])


@router.get("/messages")
async def list_messages(db: Database) -> list[dict]:
    return await whatsapp.list_messages(db)


@router.get("/templates")
async def list_templates(db: Database) -> list[dict]:
    return await whatsapp.list_templates(db)


@router.post("/send", status_code=status.HTTP_201_CREATED)
async def send_message(payload: WhatsAppMessageCreate, db: Database) -> dict:
    return await whatsapp.send_message(db, payload)


@router.post("/simulate-incoming")
async def simulate_incoming(payload: WhatsAppMessageCreate, db: Database) -> dict:
    message = await whatsapp.record_incoming_message(db, payload)
    return {"success": True, "message": message}
