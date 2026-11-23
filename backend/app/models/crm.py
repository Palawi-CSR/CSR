"""CSR partners, donors, pipeline and interaction payloads."""

from app.models.base import FallbackModel, OpenModel


class CsrPartnerCreate(FallbackModel):
    organizationName: str = "New Partner"
    contactPerson: str = ""
    email: str = ""
    phone: str = ""
    city: str = "Pandharpur"
    status: str = "Active"
    focusArea: str = "General Support"
    totalDonationAmount: float = 0


class CsrPartnerUpdate(OpenModel):
    pass


class DonorCreate(OpenModel):
    pass


class PipelineItemCreate(OpenModel):
    pass


class PipelineItemUpdate(OpenModel):
    pass


class InteractionCreate(OpenModel):
    pass
