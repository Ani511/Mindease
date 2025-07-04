from pydantic import BaseModel
from datetime import datetime

class EntryCreate(BaseModel):
    content: str

class Entry(BaseModel):
    id: int
    content: str
    sentiment: str
    timestamp: datetime

    class Config:
        orm_mode = True
