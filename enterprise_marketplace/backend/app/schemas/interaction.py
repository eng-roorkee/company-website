from datetime import datetime

from pydantic import BaseModel


class SiteInteractionCreate(BaseModel):
    page: str
    action: str
    extra_data: str | None = None
    ip_address: str | None = None


class SiteInteractionResponse(BaseModel):
    id: int
    page: str
    action: str
    extra_data: str | None
    ip_address: str | None
    created_at: datetime

    model_config = {"from_attributes": True}
