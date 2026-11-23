"""MongoDB collection names, in one place."""

GATE_REGISTER = "gate_register"
MENSTRUAL_HYGIENE = "menstrual_hygiene"
ALBENDAZOLE = "albendazole"
CSR_PARTNERS = "csr_partners"
DONORS = "donors"
PIPELINE = "pipeline"
INTERACTIONS = "interactions"
CONTRIBUTIONS = "contributions"
INVENTORY = "inventory"
TASKS = "tasks"
MATERIAL_DISTRIBUTION = "material_distribution"
STAFF_ATTENDANCE = "staff_attendance"
WHATSAPP_MESSAGES = "whatsapp_messages"
WHATSAPP_TEMPLATES = "whatsapp_templates"
# Sequence counters ({_id: <name>, seq: <int>}); not in ALL because it has no id/sort_key.
COUNTERS = "counters"
# Gate register photos ({_id: <file name>, contentType, data}); not in ALL for the same reason.
GATE_PHOTOS = "gate_photos"

ALL = (
    GATE_REGISTER,
    MENSTRUAL_HYGIENE,
    ALBENDAZOLE,
    CSR_PARTNERS,
    DONORS,
    PIPELINE,
    INTERACTIONS,
    CONTRIBUTIONS,
    INVENTORY,
    TASKS,
    MATERIAL_DISTRIBUTION,
    STAFF_ATTENDANCE,
    WHATSAPP_MESSAGES,
    WHATSAPP_TEMPLATES,
)
