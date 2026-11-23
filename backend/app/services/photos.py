"""Optional photos sent as data URLs ("data:image/jpeg;base64,...") and stored in MongoDB.

Photos live in the database rather than on disk so the API also runs where the
filesystem is read-only (e.g. Vercel serverless functions).
"""

import base64
import binascii
import re

from bson import Binary
from pymongo.asynchronous.database import AsyncDatabase

from app.db import collections

MAX_PHOTO_BYTES = 3 * 1024 * 1024

_DATA_URL = re.compile(r"^data:image/(jpeg|jpg|png|webp);base64,([A-Za-z0-9+/=\s]+)$")
_MAGIC = {"jpg": b"\xff\xd8\xff", "png": b"\x89PNG\r\n\x1a\n", "webp": b"RIFF"}


class InvalidPhotoError(ValueError):
    pass


def decode_photo(data_url: str) -> tuple[bytes, str]:
    """Return (bytes, extension) of a JPEG/PNG/WebP data URL, or raise InvalidPhotoError."""
    match = _DATA_URL.match(data_url)
    if not match:
        raise InvalidPhotoError("Photo must be a JPEG, PNG or WebP image")
    ext = "jpg" if match.group(1) in ("jpeg", "jpg") else match.group(1)
    try:
        data = base64.b64decode(match.group(2))
    except (binascii.Error, ValueError) as exc:
        raise InvalidPhotoError("Photo could not be read") from exc
    if len(data) > MAX_PHOTO_BYTES:
        raise InvalidPhotoError("Photo is larger than 3 MB")
    if not data.startswith(_MAGIC[ext]) or (ext == "webp" and data[8:12] != b"WEBP"):
        raise InvalidPhotoError("Photo content does not match its image type")
    return data, ext


_CONTENT_TYPES = {"jpg": "image/jpeg", "png": "image/png", "webp": "image/webp"}


async def save_photo(db: AsyncDatabase, photo: tuple[bytes, str], name: str) -> str:
    """Store a decoded photo as <name>.<ext> and return that file name."""
    data, ext = photo
    filename = f"{name}.{ext}"
    await db[collections.GATE_PHOTOS].replace_one(
        {"_id": filename},
        {"_id": filename, "contentType": _CONTENT_TYPES[ext], "data": Binary(data)},
        upsert=True,
    )
    return filename


async def load_photo(db: AsyncDatabase, filename: str) -> tuple[bytes, str] | None:
    """Return (bytes, content type) of a stored photo, or None if there is none by that name."""
    doc = await db[collections.GATE_PHOTOS].find_one({"_id": filename})
    return (bytes(doc["data"]), doc["contentType"]) if doc else None
