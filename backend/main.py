from fastapi import FastAPI

app = FastAPI(title="AAI Platform API", version="0.1.0")

@app.get("/health")
def health():
    return {"status": "ok"}