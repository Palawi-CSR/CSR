from typing import Any

from pydantic import BaseModel, ConfigDict, model_validator


class FallbackModel(BaseModel):
    """Payload whose falsy fields ("", 0, null) fall back to the field default.

    This keeps the behaviour of the original Express handlers, which used
    `req.body.field || default`.
    """

    @model_validator(mode="before")
    @classmethod
    def _drop_falsy(cls, data: Any) -> Any:
        if isinstance(data, dict):
            return {key: value for key, value in data.items() if value not in (None, "", 0)}
        return data


class OpenModel(BaseModel):
    """Payload that accepts any extra fields and stores them as sent."""

    model_config = ConfigDict(extra="allow")

    def to_document(self) -> dict[str, Any]:
        data = self.model_dump(exclude_unset=True)
        for reserved in ("_id", "sort_key"):
            data.pop(reserved, None)
        return data
