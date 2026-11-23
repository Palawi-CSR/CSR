from fastapi import APIRouter, HTTPException, status

from app.api.deps import Database
from app.services import operations

router = APIRouter(tags=["operations"])


@router.get("/inventory")
async def list_inventory(db: Database) -> list[dict]:
    return await operations.list_inventory(db)


@router.get("/tasks")
async def list_tasks(db: Database) -> list[dict]:
    return await operations.list_tasks(db)


@router.put("/tasks/{task_id}/toggle")
async def toggle_task(task_id: str, db: Database) -> dict:
    task = await operations.toggle_task(db, task_id)
    if task is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Task not found")
    return task


@router.get("/material-distribution")
@router.get("/archives/material")
async def list_material_distribution(db: Database) -> list[dict]:
    return await operations.list_material_distribution(db)


@router.get("/staff-attendance")
@router.get("/archives/attendance")
async def list_staff_attendance(db: Database) -> list[dict]:
    return await operations.list_staff_attendance(db)
