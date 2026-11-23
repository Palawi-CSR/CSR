"""Application settings, read from environment variables and backend/.env."""

from functools import lru_cache
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parents[2]


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=BACKEND_DIR / ".env",
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_name: str = "Palawi CSR & Donor Management API"
    api_prefix: str = "/api/v1"

    # MongoDB
    mongodb_uri: str = "mongodb://localhost:27017"
    mongodb_db_name: str = "palawi_csr"
    # Fill empty collections with the bundled seed data on startup.
    seed_on_startup: bool = True

    # Scanned source registers (PDFs), served at /files/registers. Not in git: large files.
    register_files_dir: Path = BACKEND_DIR / "storage" / "registers"

    # Optional photos uploaded with gate register entries, served at /files/gate-photos.
    gate_photo_dir: Path = BACKEND_DIR / "storage" / "gate-photos"

    # Comma-separated list of origins allowed to call the API from a browser.
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    # Integrations (not used by any endpoint yet; kept so the keys have a home).
    gemini_api_key: str | None = None
    whatsapp_phone_number_id: str | None = None
    whatsapp_business_account_id: str | None = None
    whatsapp_access_token: str | None = None
    whatsapp_verify_token: str | None = None

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
