from fastapi import FastAPI
from app.core.config import APP_NAME, API_VERSION, ENV

app = FastAPI(title=APP_NAME, version=API_VERSION)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/version")
def version():
    return {"name": APP_NAME, "version": API_VERSION, "env": ENV}