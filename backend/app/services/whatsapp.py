"""WhatsApp message log. Sending is simulated: messages are stored, not
delivered through the Meta Cloud API."""

from datetime import datetime

from pymongo.asynchronous.database import AsyncDatabase

from app.db import collections
from app.models.whatsapp import WhatsAppMessageCreate
from app.services.repository import insert_document, list_documents, new_id


def _timestamp() -> str:
    return datetime.now().strftime("%d/%m/%Y, %I:%M:%S %p")


async def list_messages(db: AsyncDatabase) -> list[dict]:
    return await list_documents(db[collections.WHATSAPP_MESSAGES])


async def list_templates(db: AsyncDatabase) -> list[dict]:
    return await list_documents(db[collections.WHATSAPP_TEMPLATES])


async def send_message(db: AsyncDatabase, payload: WhatsAppMessageCreate) -> dict:
    message = {
        "id": new_id("wa"),
        "timestamp": _timestamp(),
        "status": "Delivered",
        "direction": "outbound",
        **payload.to_document(),
    }
    return await insert_document(db[collections.WHATSAPP_MESSAGES], message)


async def record_incoming_message(db: AsyncDatabase, payload: WhatsAppMessageCreate) -> dict:
    message = {
        "id": new_id("wa"),
        "timestamp": _timestamp(),
        "status": "Received",
        "direction": "inbound",
        "toPhone": "+919822000000",
        "toName": "Palawi Admin",
        **payload.to_document(),
    }
    return await insert_document(db[collections.WHATSAPP_MESSAGES], message)
