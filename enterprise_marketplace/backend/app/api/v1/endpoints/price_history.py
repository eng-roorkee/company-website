from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.deps import get_current_admin
from app.db import get_db
from app.models import Admin, PriceHistory
from app.schemas import PriceHistoryResponse

router = APIRouter(prefix="/price-history", tags=["Price History"])


@router.get("/{product_id}", response_model=list[PriceHistoryResponse])
def get_price_history(
    product_id: int,
    db: Session = Depends(get_db),
    _admin: Admin = Depends(get_current_admin),
):
    return (
        db.query(PriceHistory)
        .filter(PriceHistory.product_id == product_id)
        .order_by(PriceHistory.changed_at.desc())
        .all()
    )


@router.get("", response_model=list[PriceHistoryResponse])
def list_price_history(
    db: Session = Depends(get_db),
    _admin: Admin = Depends(get_current_admin),
):
    return (
        db.query(PriceHistory)
        .order_by(PriceHistory.changed_at.desc())
        .limit(50)
        .all()
    )
