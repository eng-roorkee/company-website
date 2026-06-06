from datetime import datetime

from pydantic import BaseModel, Field


class ProductCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    description: str | None = Field(None, max_length=2000)
    price: float = Field(..., ge=0, le=1_000_000_000)
    image_url: str | None = Field(None, max_length=500)
    category: str | None = Field(None, max_length=100)
    is_special_offer: bool = False


class ProductUpdate(BaseModel):
    name: str | None = Field(None, min_length=1, max_length=200)
    description: str | None = Field(None, max_length=2000)
    price: float | None = Field(None, ge=0, le=1_000_000_000)
    image_url: str | None = Field(None, max_length=500)
    category: str | None = Field(None, max_length=100)
    is_special_offer: bool | None = None


class ProductResponse(BaseModel):
    id: int
    name: str
    description: str | None
    price: float
    image_url: str | None
    category: str | None
    is_special_offer: bool
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
