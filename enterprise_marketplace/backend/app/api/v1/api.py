from fastapi import APIRouter

from app.api.v1.endpoints import auth, comments, contact, interactions, newsletter, price_history, products, services, upload

router = APIRouter(prefix="/api/v1")

router.include_router(auth.router)
router.include_router(products.router)
router.include_router(services.router)
router.include_router(comments.router)
router.include_router(contact.router)
router.include_router(newsletter.router)
router.include_router(interactions.router)
router.include_router(price_history.router)
router.include_router(upload.router)
