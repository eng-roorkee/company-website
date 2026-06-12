from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import NewsletterSubscriber
from app.schemas import NewsletterCreate, NewsletterResponse

router = APIRouter(prefix="/newsletter", tags=["Newsletter"])


@router.post("", response_model=NewsletterResponse, status_code=201)
def subscribe(body: NewsletterCreate, db: Session = Depends(get_db)):
    exists = db.query(NewsletterSubscriber).filter(NewsletterSubscriber.email == body.email).first()
    if exists:
        raise HTTPException(status_code=409, detail="Email tayari imesajiliwa")
    sub = NewsletterSubscriber(email=body.email)
    db.add(sub)
    db.commit()
    db.refresh(sub)
    return sub
