"""Gate, menstrual hygiene and albendazole register payloads."""

from app.models.base import FallbackModel


class GateEntryCreate(FallbackModel):
    date: str | None = None  # defaults to today, e.g. "19-Nov-26"
    visitorName: str = "Anonymous Visitor"
    dateOfBirth: str = "N/A"  # e.g. "4/5/1990", as written in the paper register
    mobileNo: str = "Not Provided"
    address: str = ""  # area / village; falls back to the city
    state: str = ""
    city: str = ""
    remarks: str = "Visit"
    extraRemark: str = ""  # donation / remarks, e.g. "Jwari- 30 kg, Gahu- 30 kg"
    # Optional photo as a data URL: "data:image/jpeg;base64,...". Not stored as-is.
    photo: str | None = None


class MenstrualHygieneCreate(FallbackModel):
    monthYear: str = "November 2026"
    monthYearMr: str = "नोव्हेंबर २०२६"
    residentNameMr: str = "नवीन निवासिनी"
    residentNameEn: str = "New Resident"
    age: int = 16
    sanitaryPadsCount: int = 12
    distributionDate: str = "01-Nov-2026"
    healthNotesMr: str = "नियमित व सुरक्षित स्वच्छता राखली जात आहे."
    healthNotesEn: str = "Maintaining regular and safe hygiene."
    signedBy: str = "शीतल वाघ (Shital Wagh)"


class AlbendazoleCreate(FallbackModel):
    nameMr: str = "नवीन नोंद"
    nameEn: str = "New Entry"
    date1: str = "10/11/25"
    date2: str = "09/5/26"
    date3: str = "—"
    status: str = "Given (दिले)"
    category: str = "Children (मुलांची नावे)"
