from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.deps import get_current_admin
from app.db import get_db
from app.models import Admin, Comment, Product
from app.schemas import CommentCreate, CommentResponse

router = APIRouter(prefix="/comments", tags=["Comments"])


@router.get("", response_model=list[CommentResponse])
def list_comments(
    product_id: int | None = None,
    approved: bool | None = None,
    db: Session = Depends(get_db),
):
    q = db.query(Comment)
    if product_id is not None:
        q = q.filter(Comment.product_id == product_id)
    if approved is not None:
        q = q.filter(Comment.is_approved == approved)
    return q.order_by(Comment.created_at.desc()).all()


@router.post("", response_model=CommentResponse, status_code=201)
def create_comment(body: CommentCreate, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == body.product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    comment = Comment(**body.model_dump())
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment


@router.put("/{comment_id}/approve", response_model=CommentResponse)
def approve_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    _admin: Admin = Depends(get_current_admin),
):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    comment.is_approved = True
    db.commit()
    db.refresh(comment)
    return comment


@router.delete("/{comment_id}", status_code=204)
def delete_comment(
    comment_id: int,
    db: Session = Depends(get_db),
    _admin: Admin = Depends(get_current_admin),
):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    db.delete(comment)
    db.commit()
