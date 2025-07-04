from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from datetime import datetime
from .database import Base

class JournalEntry(Base):
    __tablename__ = "journal_entries"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    sentiment = Column(String(20))  # e.g., "positive", "neutral", "negative"
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime, default=datetime.utcnow)
