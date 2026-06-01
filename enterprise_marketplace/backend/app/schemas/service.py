from datetime import datetime

from pydantic import BaseModel


class ServiceCreate(BaseModel):
    name: str
    description: str | None = None
    price: float | None = None
    image_url: str | None = None


class ServiceUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    image_url: str | None = None


class ServiceResponse(BaseModel):
    id: int
    name: str
    description: str | None
    price: float | None
    image_url: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
