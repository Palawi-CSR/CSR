"""Helpers shared by the services: listing, inserting and updating documents
that carry a string `id` and a hidden `sort_key`."""

import re
import secrets
import time
from typing import Any

from pymongo import ReturnDocument
from pymongo.asynchronous.collection import AsyncCollection
from pymongo.asynchronous.database import AsyncDatabase

from app.db.collections import COUNTERS

# Fields stored in MongoDB that the API never returns.
HIDDEN_FIELDS = {"_id": 0, "sort_key": 0}


def new_id(prefix: str) -> str:
    return f"{prefix}_{int(time.time() * 1000)}{secrets.token_hex(2)}"


def contains(text: str) -> dict[str, str]:
    """Case-insensitive substring match."""
    return {"$regex": re.escape(text), "$options": "i"}


async def list_documents(
    collection: AsyncCollection, query: dict[str, Any] | None = None, limit: int = 0
) -> list[dict]:
    cursor = collection.find(query or {}, HIDDEN_FIELDS).sort("sort_key", -1)
    if limit:
        cursor = cursor.limit(limit)
    return await cursor.to_list()


async def insert_document(collection: AsyncCollection, document: dict[str, Any]) -> dict[str, Any]:
    """Insert newest-first and return the document as the API shows it."""
    await collection.insert_one({**document, "sort_key": time.time_ns()})
    return document


async def update_document(collection: AsyncCollection, doc_id: str, updates: dict[str, Any]) -> dict | None:
    updates = {key: value for key, value in updates.items() if key not in ("id", "_id", "sort_key")}
    if not updates:
        return await collection.find_one({"id": doc_id}, HIDDEN_FIELDS)
    return await collection.find_one_and_update(
        {"id": doc_id},
        {"$set": updates},
        projection=HIDDEN_FIELDS,
        return_document=ReturnDocument.AFTER,
    )


async def next_sequence(db: AsyncDatabase, name: str) -> int:
    """Atomically increment and return the counter `name` (1, 2, 3, ...); never repeats."""
    counter = await db[COUNTERS].find_one_and_update(
        {"_id": name},
        {"$inc": {"seq": 1}},
        upsert=True,
        return_document=ReturnDocument.AFTER,
    )
    return counter["seq"]
