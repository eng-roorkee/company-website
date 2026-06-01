from datetime import datetime

from pydantic import BaseModel


class CommentCreate(BaseModel):
    product_id: int
    author_name: str
    content: str


class CommentResponse(BaseModel):
    id: int
    product_id: int
    author_name: str
    content: str
    is_approved: bool
    created_at: datetime

    model_config = {"from_attributes": True}
