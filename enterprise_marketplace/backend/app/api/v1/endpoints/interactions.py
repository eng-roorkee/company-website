from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import SiteInteraction
from app.schemas import SiteInteractionCreate, SiteInteractionResponse

router = APIRouter(prefix="/interactions", tags=["Site Interactions"])


@router.post("", response_model=SiteInteractionResponse, status_code=201)
def log_interaction(body: SiteInteractionCreate, request: Request, db: Session = Depends(get_db)):
    interaction = SiteInteraction(
        page=body.page,
        action=body.action,
        extra_data=body.extra_data,
        ip_address=body.ip_address or request.client.host if request.client else None,
    )
    db.add(interaction)
    db.commit()
    db.refresh(interaction)
    return interaction


@router.get("", response_model=list[SiteInteractionResponse])
def list_interactions(
    page: str | None = None,
    action: str | None = None,
    db: Session = Depends(get_db),
):
    q = db.query(SiteInteraction)
    if page:
        q = q.filter(SiteInteraction.page == page)
    if action:
        q = q.filter(SiteInteraction.action == action)
    return q.order_by(SiteInteraction.created_at.desc()).limit(100).all()
