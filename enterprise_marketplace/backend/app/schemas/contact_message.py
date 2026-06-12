from datetime import datetime

from pydantic import BaseModel, EmailStr


class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    message: str


class ContactMessageResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: datetime

    model_config = {"from_attributes": True}
