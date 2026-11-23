"""Gate register photos, served from MongoDB at /files/gate-photos/<file name>."""

from fastapi import APIRouter, HTTPException, Response

from app.api.deps import Database
from app.services.photos import load_photo

router = APIRouter(prefix="/files", tags=["files"])


@router.get("/gate-photos/{filename}")
async def gate_photo(filename: str, db: Database) -> Response:
    photo = await load_photo(db, filename)
    if photo is None:
        raise HTTPException(status_code=404, detail="Photo not found")
    data, content_type = photo
    # Photo names are unique registration IDs and never change, so browsers may cache them.
    return Response(content=data, media_type=content_type, headers={"Cache-Control": "public, max-age=31536000, immutable"})
