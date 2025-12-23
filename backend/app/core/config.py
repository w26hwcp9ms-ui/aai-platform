import os
from dotenv import load_dotenv

load_dotenv()

APP_NAME = os.getenv("APP_NAME", "AAI Platform")
ENV = os.getenv("ENV", "local")
API_VERSION = os.getenv("API_VERSION", "0.1.0")

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg2://localhost:5432/aai_platform"
)