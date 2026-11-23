"""Vercel serverless entry point: serves the FastAPI app in backend/.

vercel.json rewrites /api/*, /files/* and /health here; FastAPI still sees the
original path, so every route works exactly as it does under uvicorn locally.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "backend"))

from main import app  # noqa: E402

__all__ = ["app"]
