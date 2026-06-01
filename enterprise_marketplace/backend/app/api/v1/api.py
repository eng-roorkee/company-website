from fastapi import APIRouter

from app.api.v1.endpoints import auth, comments, interactions, products, services

router = APIRouter(prefix="/api/v1")

router.include_router(auth.router)
router.include_router(products.router)
router.include_router(services.router)
router.include_router(comments.router)
router.include_router(interactions.router)
