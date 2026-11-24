"""Employee accounts created by an admin."""

from pydantic import BaseModel, field_validator


class EmployeeCreate(BaseModel):
    name: str
    email: str
    phone: str = ""
    designation: str = ""

    @field_validator("name", "email", "phone", "designation")
    @classmethod
    def _strip(cls, value: str) -> str:
        return value.strip()

    @field_validator("name")
    @classmethod
    def _name_required(cls, value: str) -> str:
        if not value:
            raise ValueError("Name is required")
        return value

    @field_validator("email")
    @classmethod
    def _email_shape(cls, value: str) -> str:
        value = value.lower()
        local, _, domain = value.partition("@")
        if not local or "." not in domain:
            raise ValueError("Enter a valid email address")
        return value
