"""CSR partners, donors, pipeline, interactions and contributions."""

from datetime import date

from pymongo.asynchronous.database import AsyncDatabase

from app.db import collections
from app.models.crm import (
    CsrPartnerCreate,
    CsrPartnerUpdate,
    DonorCreate,
    InteractionCreate,
    PipelineItemCreate,
    PipelineItemUpdate,
)
from app.services.repository import insert_document, list_documents, new_id, update_document


# CSR partners
async def list_csr_partners(db: AsyncDatabase) -> list[dict]:
    return await list_documents(db[collections.CSR_PARTNERS])


async def create_csr_partner(db: AsyncDatabase, payload: CsrPartnerCreate) -> dict:
    partner = {
        "id": new_id("partner"),
        **payload.model_dump(),
        "lastInteractionDate": date.today().isoformat(),
    }
    return await insert_document(db[collections.CSR_PARTNERS], partner)


async def update_csr_partner(db: AsyncDatabase, partner_id: str, payload: CsrPartnerUpdate) -> dict | None:
    return await update_document(db[collections.CSR_PARTNERS], partner_id, payload.to_document())


async def delete_csr_partner(db: AsyncDatabase, partner_id: str) -> None:
    await db[collections.CSR_PARTNERS].delete_one({"id": partner_id})


# Donors
async def list_donors(db: AsyncDatabase) -> list[dict]:
    return await list_documents(db[collections.DONORS])


async def create_donor(db: AsyncDatabase, payload: DonorCreate) -> dict:
    return await insert_document(db[collections.DONORS], {"id": new_id("donor"), **payload.to_document()})


# Pipeline
async def list_pipeline(db: AsyncDatabase) -> list[dict]:
    return await list_documents(db[collections.PIPELINE])


async def create_pipeline_item(db: AsyncDatabase, payload: PipelineItemCreate) -> dict:
    return await insert_document(db[collections.PIPELINE], {"id": new_id("pipe"), **payload.to_document()})


async def update_pipeline_item(db: AsyncDatabase, item_id: str, payload: PipelineItemUpdate) -> dict | None:
    return await update_document(db[collections.PIPELINE], item_id, payload.to_document())


# Interactions
async def list_interactions(db: AsyncDatabase) -> list[dict]:
    return await list_documents(db[collections.INTERACTIONS])


async def create_interaction(db: AsyncDatabase, payload: InteractionCreate) -> dict:
    interaction = {"id": new_id("int"), "date": date.today().isoformat(), **payload.to_document()}
    return await insert_document(db[collections.INTERACTIONS], interaction)


# Contributions
async def list_contributions(db: AsyncDatabase) -> list[dict]:
    return await list_documents(db[collections.CONTRIBUTIONS])
