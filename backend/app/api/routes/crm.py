from fastapi import APIRouter, HTTPException, status

from app.api.deps import Database
from app.models.crm import (
    CsrPartnerCreate,
    CsrPartnerUpdate,
    DonorCreate,
    InteractionCreate,
    PipelineItemCreate,
    PipelineItemUpdate,
)
from app.services import crm

router = APIRouter(tags=["crm"])


# CSR partners
@router.get("/csr-partners")
async def list_csr_partners(db: Database) -> list[dict]:
    return await crm.list_csr_partners(db)


@router.post("/csr-partners", status_code=status.HTTP_201_CREATED)
async def create_csr_partner(payload: CsrPartnerCreate, db: Database) -> dict:
    return await crm.create_csr_partner(db, payload)


@router.put("/csr-partners/{partner_id}")
async def update_csr_partner(partner_id: str, payload: CsrPartnerUpdate, db: Database) -> dict:
    partner = await crm.update_csr_partner(db, partner_id, payload)
    if partner is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Partner not found")
    return partner


@router.delete("/csr-partners/{partner_id}")
async def delete_csr_partner(partner_id: str, db: Database) -> dict:
    await crm.delete_csr_partner(db, partner_id)
    return {"success": True}


# Donors
@router.get("/donors")
async def list_donors(db: Database) -> list[dict]:
    return await crm.list_donors(db)


@router.post("/donors", status_code=status.HTTP_201_CREATED)
async def create_donor(payload: DonorCreate, db: Database) -> dict:
    return await crm.create_donor(db, payload)


# Pipeline
@router.get("/pipeline")
async def list_pipeline(db: Database) -> list[dict]:
    return await crm.list_pipeline(db)


@router.post("/pipeline", status_code=status.HTTP_201_CREATED)
async def create_pipeline_item(payload: PipelineItemCreate, db: Database) -> dict:
    return await crm.create_pipeline_item(db, payload)


@router.put("/pipeline/{item_id}")
async def update_pipeline_item(item_id: str, payload: PipelineItemUpdate, db: Database) -> dict:
    item = await crm.update_pipeline_item(db, item_id, payload)
    if item is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Pipeline item not found")
    return item


# Interactions and contributions
@router.get("/interactions")
async def list_interactions(db: Database) -> list[dict]:
    return await crm.list_interactions(db)


@router.post("/interactions", status_code=status.HTTP_201_CREATED)
async def create_interaction(payload: InteractionCreate, db: Database) -> dict:
    return await crm.create_interaction(db, payload)


@router.get("/contributions")
async def list_contributions(db: Database) -> list[dict]:
    return await crm.list_contributions(db)
