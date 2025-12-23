from pydantic import BaseModel

class PlanOut(BaseModel):
    code: str
    name: str
    monthly_price_cents: int
    currency: str
    monthly_generations: int

    class Config:
        from_attributes = True