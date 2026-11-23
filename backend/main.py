"""Palawi CSR & Donor Management API.

Run from the backend/ folder:
    uvicorn main:app --reload
"""

import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.router import api_router
from app.core.config import get_settings
from app.db.mongodb import close_mongo_connection, connect_to_mongo, get_database
from app.db.seed import seed_database

logging.basicConfig(level=logging.INFO)
settings = get_settings()


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    db = await connect_to_mongo(settings)
    if settings.seed_on_startup:
        await seed_database(db)
    try:
        yield
    finally:
        await close_mongo_connection()


app = FastAPI(title=settings.app_name, version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.api_prefix)

# Original scanned registers (PDF). check_dir=False so the API still starts without them.
app.mount(
    "/files/registers",
    StaticFiles(directory=settings.register_files_dir, check_dir=False),
    name="register-files",
)
app.mount(
    "/files/gate-photos",
    StaticFiles(directory=settings.gate_photo_dir, check_dir=False),
    name="gate-photos",
)


@app.get("/health", tags=["health"])
async def health() -> dict:
    await get_database().command("ping")
    return {"status": "ok"}
