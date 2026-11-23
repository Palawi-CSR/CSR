from typing import Annotated

from fastapi import Depends
from pymongo.asynchronous.database import AsyncDatabase

from app.db.mongodb import get_database

Database = Annotated[AsyncDatabase, Depends(get_database)]
