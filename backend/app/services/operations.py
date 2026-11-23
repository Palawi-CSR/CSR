"""Inventory, tasks, material distribution and staff attendance."""

from pymongo import ReturnDocument
from pymongo.asynchronous.database import AsyncDatabase

from app.db import collections
from app.services.repository import HIDDEN_FIELDS, list_documents


async def list_inventory(db: AsyncDatabase) -> list[dict]:
    return await list_documents(db[collections.INVENTORY])


async def list_tasks(db: AsyncDatabase) -> list[dict]:
    return await list_documents(db[collections.TASKS])


async def toggle_task(db: AsyncDatabase, task_id: str) -> dict | None:
    # A pipeline-style update flips the flag atomically on the server.
    return await db[collections.TASKS].find_one_and_update(
        {"id": task_id},
        [{"$set": {"completed": {"$not": ["$completed"]}}}],
        projection=HIDDEN_FIELDS,
        return_document=ReturnDocument.AFTER,
    )


async def list_material_distribution(db: AsyncDatabase) -> list[dict]:
    return await list_documents(db[collections.MATERIAL_DISTRIBUTION])


async def list_staff_attendance(db: AsyncDatabase) -> list[dict]:
    return await list_documents(db[collections.STAFF_ATTENDANCE])
