from datetime import datetime, timezone

import pytest
from pydantic import ValidationError

from app.schemas import (
    AdminCreate,
    AdminResponse,
    CommentCreate,
    CommentResponse,
    ProductCreate,
    ProductResponse,
    ProductUpdate,
    ServiceCreate,
    ServiceResponse,
    ServiceUpdate,
    SiteInteractionCreate,
    SiteInteractionResponse,
)


class TestAdminSchemas:
    def test_admin_create_valid(self):
        data = AdminCreate(username="admin", email="admin@test.com", password="secret123")
        assert data.username == "admin"
        assert data.email == "admin@test.com"

    def test_admin_create_invalid_email(self):
        with pytest.raises(ValidationError):
            AdminCreate(username="admin", email="not-an-email", password="secret123")

    def test_admin_response_from_attrs(self):
        data = AdminResponse(id=1, username="admin", email="a@b.com", is_active=True)
        assert data.id == 1
        assert data.is_active is True


class TestProductSchemas:
    def test_product_create_minimal(self):
        data = ProductCreate(name="Beef", price=10.0)
        assert data.name == "Beef"
        assert data.price == 10.0
        assert data.description is None
        assert data.is_special_offer is False

    def test_product_create_full(self):
        data = ProductCreate(
            name="Premium Beef",
            description="Best quality",
            price=45.99,
            image_url="/img/beef.jpg",
            category="Meat",
            is_special_offer=True,
        )
        assert data.is_special_offer is True

    def test_product_create_missing_name(self):
        with pytest.raises(ValidationError):
            ProductCreate(price=10.0)

    def test_product_create_missing_price(self):
        with pytest.raises(ValidationError):
            ProductCreate(name="Beef")

    def test_product_update_empty(self):
        data = ProductUpdate()
        assert data.name is None
        assert data.price is None

    def test_product_update_partial(self):
        data = ProductUpdate(price=20.0)
        assert data.price == 20.0
        assert data.name is None

    def test_product_response_from_attrs(self):
        now = datetime.now(timezone.utc)
        data = ProductResponse(
            id=1, name="Beef", price=10.0, description=None,
            image_url=None, category=None, is_special_offer=False,
            created_at=now, updated_at=now,
        )
        assert data.id == 1
        assert data.name == "Beef"


class TestServiceSchemas:
    def test_service_create_minimal(self):
        data = ServiceCreate(name="Butchering")
        assert data.name == "Butchering"
        assert data.price is None

    def test_service_create_with_price(self):
        data = ServiceCreate(name="Delivery", price=5.0)
        assert data.price == 5.0

    def test_service_update(self):
        data = ServiceUpdate(price=10.0)
        assert data.price == 10.0


class TestCommentSchemas:
    def test_comment_create_valid(self):
        data = CommentCreate(product_id=1, author_name="John", content="Great!")
        assert data.product_id == 1
        assert data.author_name == "John"

    def test_comment_create_missing_field(self):
        with pytest.raises(ValidationError):
            CommentCreate(product_id=1, author_name="John")

    def test_comment_response(self):
        now = datetime.now(timezone.utc)
        data = CommentResponse(
            id=1, product_id=1, author_name="John",
            content="Nice!", is_approved=False, created_at=now,
        )
        assert data.is_approved is False


class TestSiteInteractionSchemas:
    def test_interaction_create_minimal(self):
        data = SiteInteractionCreate(page="/", action="visit")
        assert data.page == "/"
        assert data.action == "visit"
        assert data.extra_data is None

    def test_interaction_create_full(self):
        data = SiteInteractionCreate(
            page="/products", action="click",
            extra_data='{"id": 1}', ip_address="127.0.0.1",
        )
        assert data.extra_data == '{"id": 1}'
        assert data.ip_address == "127.0.0.1"
