"""Replace the seeded gate register entries in MongoDB with the full
Jan–Sep 2026 register from app/db/seed_data/gate_register.json.

Seeding on startup only fills an empty collection, so an existing database
keeps its old entries until this is run. Entries added through the app
(ids like gate_<timestamp>) are kept. A backup of the collection is always
written to scripts/gate_register_backup.json first.

Usage (from backend/):
    python -m scripts.reseed_gate_register            # dry run: backup + report
    python -m scripts.reseed_gate_register --apply    # replace seeded entries
"""

import json
import re
import sys
from pathlib import Path

from pymongo import MongoClient

from app.core.config import get_settings

SEED_FILE = Path(__file__).resolve().parents[1] / "app" / "db" / "seed_data" / "gate_register.json"
BACKUP_FILE = Path(__file__).resolve().parent / "gate_register_backup.json"
SEED_ID = re.compile(r"^gate_[a-z]{3}\d+_\d+$")


def main(apply: bool) -> None:
    settings = get_settings()
    coll = MongoClient(settings.mongodb_uri)[settings.mongodb_db_name]["gate_register"]

    existing = list(coll.find({}, {"_id": 0}))
    BACKUP_FILE.write_text(json.dumps(existing, ensure_ascii=False, indent=1, default=str), "utf-8")
    seeded = [d for d in existing if SEED_ID.match(d.get("id", ""))]
    manual = [d for d in existing if not SEED_ID.match(d.get("id", ""))]
    print(f"live: {len(existing)} total, {len(seeded)} seeded, {len(manual)} added via app (kept)")
    print(f"backup written to {BACKUP_FILE}")

    records = json.loads(SEED_FILE.read_text("utf-8"))
    # Same ordering as app/db/seed.py: first record shows first.
    docs = [{**record, "sort_key": -index} for index, record in enumerate(records)]
    print(f"to insert: {len(docs)}")
    if not apply:
        print("dry run; pass --apply to write")
        return
    deleted = coll.delete_many({"id": {"$in": [d["id"] for d in seeded]}}).deleted_count
    inserted = len(coll.insert_many(docs).inserted_ids)
    print(f"deleted {deleted}, inserted {inserted}, collection now has {coll.count_documents({})}")


if __name__ == "__main__":
    main("--apply" in sys.argv)
