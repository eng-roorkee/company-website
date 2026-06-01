import pytest
from fastapi import status

from app.core.security import hash_password
from app.models import Admin


class TestAuthEndpoints:
    def test_seed_admin(self, client):
        resp = client.post("/api/v1/auth/seed")
        assert resp.status_code == 201
        data = resp.json()
        assert "Admin created" in data["message"]

    def test_seed_admin_idempotent(self, client):
        client.post("/api/v1/auth/seed")
        resp = client.post("/api/v1/auth/seed")
        assert resp.status_code == 201
        assert resp.json()["message"] == "Admin already exists"

    def test_login_success(self, client):
        client.post("/api/v1/auth/seed")
        resp = client.post("/api/v1/auth/login", json={
            "username": "admin",
            "password": "admin123",
        })
        assert resp.status_code == 200
        data = resp.json()
        assert data["token_type"] == "bearer"
        assert "access_token" in data
        assert data["admin"]["username"] == "admin"

    def test_login_wrong_password(self, client):
        client.post("/api/v1/auth/seed")
        resp = client.post("/api/v1/auth/login", json={
            "username": "admin",
            "password": "wrong",
        })
        assert resp.status_code == 401

    def test_login_nonexistent_user(self, client):
        resp = client.post("/api/v1/auth/login", json={
            "username": "ghost",
            "password": "pw",
        })
        assert resp.status_code == 401

    def test_seed_then_login_returns_valid_token(self, client):
        client.post("/api/v1/auth/seed")
        login = client.post("/api/v1/auth/login", json={
            "username": "admin",
            "password": "admin123",
        })
        token = login.json()["access_token"]
        assert len(token) > 20
