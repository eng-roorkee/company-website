from datetime import datetime

from pydantic import BaseModel


class ProductCreate(BaseModel):
    name: str
    description: str | None = None
    price: float
    image_url: str | None = None
    category: str | None = None
    is_special_offer: bool = False


class ProductUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    price: float | None = None
    image_url: str | None = None
    category: str | None = None
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
