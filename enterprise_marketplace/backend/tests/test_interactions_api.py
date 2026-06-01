class TestInteractionsAPI:
    def test_log_interaction(self, client):
        resp = client.post("/api/v1/interactions", json={
            "page": "/products",
            "action": "view",
        })
        assert resp.status_code == 201
        data = resp.json()
        assert data["page"] == "/products"
        assert data["action"] == "view"
        assert data["id"] is not None

    def test_log_interaction_with_extra(self, client):
        resp = client.post("/api/v1/interactions", json={
            "page": "/",
            "action": "click",
            "extra_data": '{"button": "hero"}',
            "ip_address": "127.0.0.1",
        })
        assert resp.status_code == 201
        assert resp.json()["extra_data"] == '{"button": "hero"}'

    def test_list_interactions(self, client):
        client.post("/api/v1/interactions", json={"page": "/a", "action": "view"})
        client.post("/api/v1/interactions", json={"page": "/b", "action": "view"})

        resp = client.get("/api/v1/interactions")
        assert len(resp.json()) == 2

    def test_filter_interactions_by_page(self, client):
        client.post("/api/v1/interactions", json={"page": "/home", "action": "view"})
        client.post("/api/v1/interactions", json={"page": "/about", "action": "view"})

        resp = client.get("/api/v1/interactions?page=/home")
        assert len(resp.json()) == 1
        assert resp.json()[0]["page"] == "/home"
