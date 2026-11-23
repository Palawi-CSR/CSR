from fastapi import APIRouter

from app.api.deps import Database
from app.services import dashboard

router = APIRouter(prefix="/dashboard", tags=["dashboard"])


@router.get("/metrics")
async def get_metrics(db: Database) -> dict:
    return await dashboard.get_metrics(db)
