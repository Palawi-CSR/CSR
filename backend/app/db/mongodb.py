"""MongoDB client lifecycle (PyMongo's native async client)."""

from pymongo import AsyncMongoClient
from pymongo.asynchronous.database import AsyncDatabase

from app.core.config import Settings


class _Mongo:
    client: AsyncMongoClient | None = None
    db: AsyncDatabase | None = None


_mongo = _Mongo()


async def connect_to_mongo(settings: Settings) -> AsyncDatabase:
    client: AsyncMongoClient = AsyncMongoClient(settings.mongodb_uri, serverSelectionTimeoutMS=5000)
    # Fail fast at startup if the database is unreachable.
    await client.admin.command("ping")
    _mongo.client = client
    _mongo.db = client[settings.mongodb_db_name]
    return _mongo.db


async def close_mongo_connection() -> None:
    if _mongo.client is not None:
        await _mongo.client.close()
    _mongo.client = None
    _mongo.db = None


def get_database() -> AsyncDatabase:
    if _mongo.db is None:
        raise RuntimeError("MongoDB is not connected; the app lifespan has not started.")
    return _mongo.db
