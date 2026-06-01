from datetime import datetime

import pytest

from app.models import Admin, Comment, Product, Service, SiteInteraction


class TestAdminModel:
    def test_create_admin(self, db):
        admin = Admin(
            username="admin1",
            email="admin@example.com",
            hashed_password="hashed_pw",
            is_active=True,
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)

        assert admin.id is not None
        assert admin.username == "admin1"
        assert admin.email == "admin@example.com"
        assert admin.hashed_password == "hashed_pw"
        assert admin.is_active is True

    def test_admin_default_is_active(self, db):
        admin = Admin(
            username="admin2",
            email="admin2@example.com",
            hashed_password="hashed_pw",
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        assert admin.is_active is True


class TestProductModel:
    def test_create_product(self, db):
        product = Product(
            name="Beef Steak",
            description="Premium cut",
            price=25.99,
            image_url="/images/steak.jpg",
            category="Beef",
            is_special_offer=True,
        )
        db.add(product)
        db.commit()
        db.refresh(product)

        assert product.id is not None
        assert product.name == "Beef Steak"
        assert product.price == 25.99
        assert product.is_special_offer is True
        assert isinstance(product.created_at, datetime)
        assert isinstance(product.updated_at, datetime)

    def test_product_default_special_offer(self, db):
        product = Product(name="Chicken Wings", price=12.99)
        db.add(product)
        db.commit()
        db.refresh(product)
        assert product.is_special_offer is False

    def test_product_nullable_fields(self, db):
        product = Product(name="Test Product", price=9.99)
        db.add(product)
        db.commit()
        db.refresh(product)
        assert product.description is None
        assert product.image_url is None
        assert product.category is None


class TestServiceModel:
    def test_create_service(self, db):
        service = Service(
            name="Butchering",
            description="Full animal butchering service",
            price=150.00,
            image_url="/images/butcher.jpg",
        )
        db.add(service)
        db.commit()
        db.refresh(service)

        assert service.id is not None
        assert service.name == "Butchering"
        assert service.price == 150.00

    def test_service_nullable_price(self, db):
        service = Service(name="Free Consultation")
        db.add(service)
        db.commit()
        db.refresh(service)
        assert service.price is None


class TestCommentModel:
    def test_create_comment(self, db):
        product = Product(name="Test", price=10.0)
        db.add(product)
        db.commit()

        comment = Comment(
            product_id=product.id,
            author_name="John",
            content="Great product!",
        )
        db.add(comment)
        db.commit()
        db.refresh(comment)

        assert comment.id is not None
        assert comment.product_id == product.id
        assert comment.author_name == "John"
        assert comment.content == "Great product!"
        assert comment.is_approved is False
        assert isinstance(comment.created_at, datetime)

    def test_approve_comment(self, db):
        product = Product(name="Test", price=10.0)
        db.add(product)
        db.commit()

        comment = Comment(
            product_id=product.id,
            author_name="John",
            content="Nice!",
        )
        db.add(comment)
        db.commit()

        comment.is_approved = True
        db.commit()
        db.refresh(comment)
        assert comment.is_approved is True


class TestSiteInteractionModel:
    def test_create_interaction(self, db):
        interaction = SiteInteraction(
            page="/products",
            action="view",
            extra_data='{"source": "homepage"}',
            ip_address="192.168.1.1",
        )
        db.add(interaction)
        db.commit()
        db.refresh(interaction)

        assert interaction.id is not None
        assert interaction.page == "/products"
        assert interaction.action == "view"
        assert interaction.extra_data == '{"source": "homepage"}'
        assert interaction.ip_address == "192.168.1.1"

    def test_interaction_nullable_fields(self, db):
        interaction = SiteInteraction(page="/", action="visit")
        db.add(interaction)
        db.commit()
        db.refresh(interaction)
        assert interaction.extra_data is None
        assert interaction.ip_address is None


class TestModelRelationships:
    def test_comment_belongs_to_product(self, db):
        product = Product(name="Ribeye", price=35.00)
        db.add(product)
        db.commit()

        comment = Comment(
            product_id=product.id,
            author_name="Alice",
            content="Delicious!",
        )
        db.add(comment)
        db.commit()

        assert comment.product_id == product.id

    def test_table_names(self):
        assert Admin.__tablename__ == "admins"
        assert Product.__tablename__ == "products"
        assert Service.__tablename__ == "services"
        assert Comment.__tablename__ == "comments"
        assert SiteInteraction.__tablename__ == "site_interactions"
