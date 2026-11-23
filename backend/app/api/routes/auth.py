"""Placeholder auth: there is a single demo admin and no password check yet."""

from fastapi import APIRouter

from app.models.auth import LoginRequest, UserOut

router = APIRouter(prefix="/auth", tags=["auth"])

_DEMO_ADMIN = UserOut(id="usr_1", name="Admin", email="admin@palawi.org", role="Admin")


@router.post("/login")
async def login(payload: LoginRequest) -> dict:
    user = _DEMO_ADMIN.model_copy(update={"email": payload.email or _DEMO_ADMIN.email})
    return {"success": True, "user": user}


@router.get("/me", response_model=UserOut)
async def me() -> UserOut:
    return _DEMO_ADMIN
