"""Optional photos sent as data URLs ("data:image/jpeg;base64,...") and saved to disk."""

import base64
import binascii
import re
from pathlib import Path

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


def save_photo(photo: tuple[bytes, str], directory: Path, name: str) -> str:
    """Write a decoded photo as <directory>/<name>.<ext> and return the file name."""
    data, ext = photo
    directory.mkdir(parents=True, exist_ok=True)
    filename = f"{name}.{ext}"
    (directory / filename).write_bytes(data)
    return filename
