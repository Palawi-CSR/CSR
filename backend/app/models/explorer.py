from pydantic import BaseModel


class MongoQueryRequest(BaseModel):
    collection: str
