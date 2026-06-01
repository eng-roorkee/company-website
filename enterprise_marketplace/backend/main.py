import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.api import router as api_router

app = FastAPI(
    title="Enterprise Marketplace API",
    description="High-performance backend engine managing inventory, custom offers, and local payments.",
    version="1.0.0",
)

origins = [
    "http://localhost:5173",
    "https://yourclientdomain.co.tz",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/", tags=["Health Check"])
async def root():
    return {
        "status": "online",
        "environment": "production_ready",
        "system_architecture": "decoupled_microservices",
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
