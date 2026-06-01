class TestServicesAPI:
    def test_list_empty(self, client):
        resp = client.get("/api/v1/services")
        assert resp.status_code == 200
        assert resp.json() == []

    def test_create_requires_auth(self, client):
        resp = client.post("/api/v1/services", json={"name": "Test"})
        assert resp.status_code == 401

    def test_create_service(self, client, auth_header):
        resp = client.post("/api/v1/services", json={
            "name": "Butchering",
            "description": "Full service",
            "price": 150.0,
        }, headers=auth_header)
        assert resp.status_code == 201
        assert resp.json()["name"] == "Butchering"
        assert resp.json()["price"] == 150.0

    def test_get_service(self, client, auth_header):
        create = client.post("/api/v1/services", json={
            "name": "Delivery", "price": 5.0,
        }, headers=auth_header)
        sid = create.json()["id"]

        resp = client.get(f"/api/v1/services/{sid}")
        assert resp.status_code == 200
        assert resp.json()["name"] == "Delivery"

    def test_get_service_not_found(self, client):
        resp = client.get("/api/v1/services/999")
        assert resp.status_code == 404

    def test_update_service(self, client, auth_header):
        create = client.post("/api/v1/services", json={
            "name": "Old", "price": 10.0,
        }, headers=auth_header)
        sid = create.json()["id"]

        resp = client.put(f"/api/v1/services/{sid}", json={
            "name": "Updated", "price": 20.0,
        }, headers=auth_header)
        assert resp.json()["name"] == "Updated"
        assert resp.json()["price"] == 20.0

    def test_delete_service(self, client, auth_header):
        create = client.post("/api/v1/services", json={
            "name": "Delete", "price": 1.0,
        }, headers=auth_header)
        sid = create.json()["id"]

        resp = client.delete(f"/api/v1/services/{sid}", headers=auth_header)
        assert resp.status_code == 204

        resp = client.get(f"/api/v1/services/{sid}")
        assert resp.status_code == 404
