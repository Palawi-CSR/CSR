from fastapi import APIRouter

from app.api.deps import Database
from app.models.explorer import MongoQueryRequest
from app.services import explorer

router = APIRouter(prefix="/mongodb", tags=["explorer"])


@router.post("/query")
async def query_collection(payload: MongoQueryRequest, db: Database) -> dict:
    return {"success": True, "documents": await explorer.query_collection(db, payload.collection)}
