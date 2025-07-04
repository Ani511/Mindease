from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from textblob import TextBlob
from transformers import pipeline
from .. import models, schemas, database
from collections import Counter
import re


router = APIRouter(
    prefix="/journal",
    tags=["Journal"]
)
transformer_pipeline = pipeline(
    "sentiment-analysis",
    model="cardiffnlp/twitter-roberta-base-sentiment"
)

label_map = {
    "LABEL_0": "negative",
    "LABEL_1": "neutral",
    "LABEL_2": "positive"
}

@router.post("/entries", response_model=schemas.Entry)
def create_entry(entry: schemas.EntryCreate, db: Session = Depends(database.get_db)):
    polarity = TextBlob(entry.content).sentiment.polarity
    sentiment = (
        "positive" if polarity > 0.2 else
        "negative" if polarity < -0.2 else
        "neutral"
    )

    new_entry = models.JournalEntry(
        content=entry.content,
        sentiment=sentiment
    )
    db.add(new_entry)
    db.commit()
    db.refresh(new_entry)
    return new_entry

@router.get("/entries", response_model=list[schemas.Entry])
def get_entries(db: Session = Depends(database.get_db)):
    return db.query(models.JournalEntry).all()

@router.post("/analyze")
def analyze_mood(entry: schemas.EntryCreate):
    sentiment_score = TextBlob(entry.content).sentiment.polarity
    mood = (
        "positive" if sentiment_score > 0.2
        else "negative" if sentiment_score < -0.2
        else "neutral"
    )
    transformer_result = transformer_pipeline(entry.content)[0]
    model_label = label_map[transformer_result["label"]]
    model_score = round(transformer_result["score"], 3)
    print(f"BERT: {model_label} ({model_score}) | TextBlob: {mood}")
    return {
        "sentiment": mood,
        "model_sentiment": model_label,
        "model_confidence": model_score
        }
@router.get("/wordcloud")
def wordcloud_data(db: Session = Depends(database.get_db)):
    entries = db.query(models.JournalEntry).all()
    text = " ".join([entry.content for entry in entries])
    words = re.findall(r'\b\w+\b', text.lower())
    common = Counter(words)
    stopwords = {"the", "and", "a", "i", "to", "is", "was", "but", "got", "my", "of", "it"}
    filtered = {word: freq for word, freq in common.items() if word not in stopwords and len(word) > 2}
    return filtered