from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from fastapi import Depends
from sqlalchemy.orm import Session
from app.deps import get_db
from app.models import Plan
from app.schemas import PlanOut
from app.core.config import APP_NAME, API_VERSION, ENV

app = FastAPI(title=APP_NAME, version=API_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/version")
def version():
    return {"name": APP_NAME, "version": API_VERSION, "env": ENV}

@app.get("/plans", response_model=List[PlanOut])
def list_plans(db: Session = Depends(get_db)):
    return db.query(Plan).order_by(Plan.id).all()