from fastapi import APIRouter, HTTPException, status

from app.api.deps import Database
from app.models.employees import EmployeeCreate
from app.services import employees

router = APIRouter(prefix="/employees", tags=["employees"])


@router.get("")
async def list_employees(db: Database) -> list[dict]:
    return await employees.list_employees(db)


@router.post("", status_code=status.HTTP_201_CREATED)
async def create_employee(payload: EmployeeCreate, db: Database) -> dict:
    try:
        return await employees.create_employee(db, payload)
    except employees.EmailTakenError:
        raise HTTPException(status.HTTP_409_CONFLICT, "An employee with this email already exists")


@router.delete("/{employee_id}")
async def delete_employee(employee_id: str, db: Database) -> dict:
    if not await employees.delete_employee(db, employee_id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Employee not found")
    return {"success": True}
