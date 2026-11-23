"""Read-only collection preview used by the in-app MongoDB query panel."""

from pymongo.asynchronous.database import AsyncDatabase

from app.db import collections
from app.services.repository import list_documents

# Only these collections may be browsed, with a row limit each (0 = no limit).
_BROWSABLE = {
    collections.GATE_REGISTER: 50,
    collections.CSR_PARTNERS: 0,
    collections.DONORS: 0,
}


async def query_collection(db: AsyncDatabase, name: str) -> list[dict]:
    if name not in _BROWSABLE:
        return []
    return await list_documents(db[name], limit=_BROWSABLE[name])
