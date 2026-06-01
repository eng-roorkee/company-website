from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.core.security import hash_password, verify_password, create_access_token
from app.db import get_db
from app.models import Admin
from app.schemas import AdminResponse

router = APIRouter(prefix="/auth", tags=["Authentication"])


class LoginRequest(BaseModel):
    username: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    admin: AdminResponse


@router.post("/login", response_model=TokenResponse)
def login(body: LoginRequest, db: Session = Depends(get_db)):
    admin = db.query(Admin).filter(Admin.username == body.username).first()
    if not admin or not verify_password(body.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
        )
    if not admin.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is disabled",
        )
    token = create_access_token({"sub": str(admin.id)})
    return TokenResponse(
        access_token=token,
        admin=AdminResponse.model_validate(admin),
    )


@router.post("/seed", status_code=201)
def seed_admin(db: Session = Depends(get_db)):
    existing = db.query(Admin).filter(Admin.username == "admin").first()
    if existing:
        return {"message": "Admin already exists", "username": "admin"}
    admin = Admin(
        username="admin",
        email="admin@tuliho.co.tz",
        hashed_password=hash_password("admin123"),
        is_active=True,
    )
    db.add(admin)
    db.commit()
    return {"message": "Admin created (username=admin, password=admin123)"}
