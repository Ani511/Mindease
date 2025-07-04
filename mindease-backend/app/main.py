from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import models, database
from app.routers import journal

app = FastAPI()

# CORS setup for React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DB table creation
models.Base.metadata.create_all(bind=database.engine)

# Route
app.include_router(journal.router)
@app.get("/")
def root():
    return {"message": "MindEase backend is running!"}
