# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(
    title="Enterprise Marketplace API",
    description="High-performance backend engine managing inventory, custom offers, and local payments.",
    version="1.0.0"
)

# Strict CORS policies - Ensure frontend can securely talk to backend
origins = [
    "http://localhost:3000",      # Local Next.js dev environment
    "https://yourclientdomain.co.tz", # Live production URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Health Check"])
async def root():
    return {
        "status": "online",
        "environment": "production_ready",
        "system_architecture": "decoupled_microservices"
    }

if __name__ == "__main__":
    # Standard production worker configuration
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
