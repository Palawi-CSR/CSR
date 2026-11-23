from app.models.base import OpenModel


class WhatsAppMessageCreate(OpenModel):
    """Outbound or simulated inbound message: toPhone, toName, content, ..."""
