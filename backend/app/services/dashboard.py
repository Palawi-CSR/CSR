from pymongo.asynchronous.database import AsyncDatabase

from app.db import collections
from app.services.repository import list_documents

# Figures not yet derived from stored records (carried over from server.ts).
_STATIC_METRICS = {
    "totalFundsRaised": 1250000,
    "totalCommitted": 750000,
    "activePipelineValue": 1500000,
    "proposalsInReview": 4,
    "whatsappDeliveryRate": 98.5,
    "inventoryUnitsDispatched": 1420,
    "pipelineByStage": [
        {"stage": "Prospecting", "count": 2, "value": 300000},
        {"stage": "Proposal Sent", "count": 3, "value": 750000},
        {"stage": "Negotiation", "count": 2, "value": 900000},
    ],
    "monthlyFundraising": [
        {"month": "Jun", "received": 180000, "target": 200000, "required": 250000},
        {"month": "Jul", "received": 220000, "target": 200000, "required": 250000},
        {"month": "Aug", "received": 290000, "target": 250000, "required": 250000},
        {"month": "Sep", "received": 310000, "target": 300000, "required": 250000},
    ],
}


async def get_metrics(db: AsyncDatabase) -> dict:
    return {
        **_STATIC_METRICS,
        "totalCsrPartners": await db[collections.CSR_PARTNERS].count_documents({}),
        "totalDonors": await db[collections.DONORS].count_documents({}),
        "pendingTasksCount": await db[collections.TASKS].count_documents({"completed": {"$ne": True}}),
        "recentInteractions": await list_documents(db[collections.INTERACTIONS]),
    }
