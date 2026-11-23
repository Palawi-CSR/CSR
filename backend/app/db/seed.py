"""Seed empty collections with the records that used to live in server.ts."""

import json
import logging
from pathlib import Path

from pymongo import ASCENDING, DESCENDING
from pymongo.asynchronous.database import AsyncDatabase

from app.db import collections

logger = logging.getLogger(__name__)

SEED_DIR = Path(__file__).parent / "seed_data"
LARGE_DATASETS = {
    collections.GATE_REGISTER: "gate_register.json",
    collections.MENSTRUAL_HYGIENE: "menstrual_hygiene.json",
    collections.ALBENDAZOLE: "albendazole.json",
}


def _load_seed_data() -> dict[str, list[dict]]:
    datasets: dict[str, list[dict]] = json.loads((SEED_DIR / "base_records.json").read_text("utf-8"))
    for name, filename in LARGE_DATASETS.items():
        datasets[name] = json.loads((SEED_DIR / filename).read_text("utf-8"))
    return datasets


async def ensure_indexes(db: AsyncDatabase) -> None:
    for name in collections.ALL:
        await db[name].create_index([("id", ASCENDING)], unique=True)
        await db[name].create_index([("sort_key", DESCENDING)])


async def seed_database(db: AsyncDatabase) -> None:
    await ensure_indexes(db)
    for name, records in _load_seed_data().items():
        collection = db[name]
        if await collection.count_documents({}, limit=1):
            continue
        # Seed order is display order: the first record gets the highest sort_key.
        # New records get a timestamp sort_key, so they appear above all seed data.
        docs = [{**record, "sort_key": -index} for index, record in enumerate(records)]
        if docs:
            await collection.insert_many(docs)
            logger.info("Seeded %s with %d documents", name, len(docs))
