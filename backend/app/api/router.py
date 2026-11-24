"""Collects every route module into one router, mounted at /api/v1 in main.py."""

from fastapi import APIRouter

from app.api.routes import auth, crm, dashboard, employees, explorer, operations, registers, whatsapp

api_router = APIRouter()
for module in (auth, employees, registers, crm, operations, whatsapp, dashboard, explorer):
    api_router.include_router(module.router)
