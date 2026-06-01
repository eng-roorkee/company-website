class TestProductsAPI:
    def test_list_products_empty(self, client):
        resp = client.get("/api/v1/products")
        assert resp.status_code == 200
        assert resp.json() == []

    def test_create_product_requires_auth(self, client):
        resp = client.post("/api/v1/products", json={
            "name": "Beef",
            "price": 10.0,
        })
        assert resp.status_code == 401

    def test_create_product_as_admin(self, client, auth_header):
        resp = client.post("/api/v1/products", json={
            "name": "Beef Steak",
            "description": "Premium cut",
            "price": 25.99,
            "category": "Beef",
            "is_special_offer": True,
        }, headers=auth_header)
        assert resp.status_code == 201
        data = resp.json()
        assert data["name"] == "Beef Steak"
        assert data["price"] == 25.99
        assert data["is_special_offer"] is True
        assert data["id"] is not None

    def test_get_product(self, client, auth_header):
        create = client.post("/api/v1/products", json={
            "name": "Ribeye", "price": 35.0,
        }, headers=auth_header)
        pid = create.json()["id"]

        resp = client.get(f"/api/v1/products/{pid}")
        assert resp.status_code == 200
        assert resp.json()["name"] == "Ribeye"

    def test_get_product_not_found(self, client):
        resp = client.get("/api/v1/products/999")
        assert resp.status_code == 404

    def test_list_products_with_filter(self, client, auth_header):
        client.post("/api/v1/products", json={
            "name": "Beef", "price": 10.0, "category": "Beef",
        }, headers=auth_header)
        client.post("/api/v1/products", json={
            "name": "Chicken", "price": 8.0, "category": "Poultry",
        }, headers=auth_header)

        resp = client.get("/api/v1/products?category=Beef")
        data = resp.json()
        assert len(data) == 1
        assert data[0]["name"] == "Beef"

    def test_update_product(self, client, auth_header):
        create = client.post("/api/v1/products", json={
            "name": "Old Name", "price": 10.0,
        }, headers=auth_header)
        pid = create.json()["id"]

        resp = client.put(f"/api/v1/products/{pid}", json={
            "name": "New Name", "price": 15.0,
        }, headers=auth_header)
        assert resp.status_code == 200
        assert resp.json()["name"] == "New Name"
        assert resp.json()["price"] == 15.0

    def test_update_product_partial(self, client, auth_header):
        create = client.post("/api/v1/products", json={
            "name": "Test", "price": 10.0,
        }, headers=auth_header)
        pid = create.json()["id"]

        resp = client.put(f"/api/v1/products/{pid}", json={
            "price": 20.0,
        }, headers=auth_header)
        assert resp.json()["price"] == 20.0
        assert resp.json()["name"] == "Test"

    def test_delete_product(self, client, auth_header):
        create = client.post("/api/v1/products", json={
            "name": "Delete Me", "price": 5.0,
        }, headers=auth_header)
        pid = create.json()["id"]

        resp = client.delete(f"/api/v1/products/{pid}", headers=auth_header)
        assert resp.status_code == 204

        resp = client.get(f"/api/v1/products/{pid}")
        assert resp.status_code == 404

    def test_delete_product_not_found(self, client, auth_header):
        resp = client.delete("/api/v1/products/999", headers=auth_header)
        assert resp.status_code == 404

    def test_special_offer_filter(self, client, auth_header):
        client.post("/api/v1/products", json={
            "name": "A", "price": 1.0, "is_special_offer": True,
        }, headers=auth_header)
        client.post("/api/v1/products", json={
            "name": "B", "price": 2.0,
        }, headers=auth_header)

        resp = client.get("/api/v1/products?special_offer=true")
        assert len(resp.json()) == 1
        assert resp.json()[0]["name"] == "A"
