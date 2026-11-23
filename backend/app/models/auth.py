from pydantic import BaseModel


class LoginRequest(BaseModel):
    email: str | None = None


class UserOut(BaseModel):
    id: str
    name: str
    email: str
    role: str
