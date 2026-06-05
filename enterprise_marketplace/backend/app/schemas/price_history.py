from datetime import datetime

from pydantic import BaseModel


class PriceHistoryResponse(BaseModel):
    id: int
    product_id: int
    old_price: float
    new_price: float
    changed_at: datetime

    model_config = {"from_attributes": True}
