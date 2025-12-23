from app.db import SessionLocal
from app.models import Plan

DEFAULT_PLANS = [
    {"code": "starter", "name": "Starter", "monthly_price_cents": 1500, "currency": "USD", "monthly_generations": 500},
    {"code": "pro", "name": "Pro", "monthly_price_cents": 2900, "currency": "USD", "monthly_generations": 2000},
    {"code": "studio", "name": "Studio", "monthly_price_cents": 4900, "currency": "USD", "monthly_generations": 8000},
]

def seed_plans():
    db = SessionLocal()
    try:
        for p in DEFAULT_PLANS:
            exists = db.query(Plan).filter(Plan.code == p["code"]).first()
            if not exists:
                db.add(Plan(**p))
        db.commit()
    finally:
        db.close()