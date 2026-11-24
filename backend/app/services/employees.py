"""Employee accounts: admins add them; they sign in with Employee access."""

from datetime import datetime, timezone

from pymongo.asynchronous.database import AsyncDatabase

from app.db import collections
from app.models.employees import EmployeeCreate
from app.services.repository import HIDDEN_FIELDS, insert_document, list_documents, new_id


class EmailTakenError(Exception):
    pass


async def list_employees(db: AsyncDatabase) -> list[dict]:
    return await list_documents(db[collections.EMPLOYEES])


async def find_by_email(db: AsyncDatabase, email: str) -> dict | None:
    return await db[collections.EMPLOYEES].find_one({"email": email.strip().lower()}, HIDDEN_FIELDS)


async def create_employee(db: AsyncDatabase, payload: EmployeeCreate) -> dict:
    if await find_by_email(db, payload.email):
        raise EmailTakenError(payload.email)
    employee = {
        "id": new_id("emp"),
        **payload.model_dump(),
        "role": "Employee",
        "organization": "Palawi Foundation",
        "createdAt": datetime.now(timezone.utc).isoformat(),
    }
    return await insert_document(db[collections.EMPLOYEES], employee)


async def delete_employee(db: AsyncDatabase, employee_id: str) -> bool:
    result = await db[collections.EMPLOYEES].delete_one({"id": employee_id})
    return result.deleted_count > 0
