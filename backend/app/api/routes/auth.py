"""Placeholder auth: no password check yet. Emails of employees an admin has
added sign in as that Employee; any other email signs in as the demo admin."""

from fastapi import APIRouter

from app.api.deps import Database
from app.models.auth import LoginRequest, UserOut
from app.services import employees

router = APIRouter(prefix="/auth", tags=["auth"])

_DEMO_ADMIN = UserOut(id="usr_1", name="Admin", email="admin@palawi.org", role="Admin")


@router.post("/login")
async def login(payload: LoginRequest, db: Database) -> dict:
    if payload.email:
        employee = await employees.find_by_email(db, payload.email)
        if employee:
            user = UserOut(id=employee["id"], name=employee["name"], email=employee["email"], role="Employee")
            return {"success": True, "user": user}
    user = _DEMO_ADMIN.model_copy(update={"email": payload.email or _DEMO_ADMIN.email})
    return {"success": True, "user": user}


@router.get("/me", response_model=UserOut)
async def me() -> UserOut:
    return _DEMO_ADMIN
