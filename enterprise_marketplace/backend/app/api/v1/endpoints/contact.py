from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import ContactMessage
from app.schemas import ContactMessageCreate, ContactMessageResponse

router = APIRouter(prefix="/contact", tags=["Contact"])


@router.post("", response_model=ContactMessageResponse, status_code=201)
def submit_contact(body: ContactMessageCreate, db: Session = Depends(get_db)):
    msg = ContactMessage(**body.model_dump())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg


@router.get("", response_model=list[ContactMessageResponse])
def list_contact_messages(db: Session = Depends(get_db)):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
