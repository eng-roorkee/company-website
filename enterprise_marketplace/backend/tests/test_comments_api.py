class TestCommentsAPI:
    def _create_product(self, client, auth_header):
        resp = client.post("/api/v1/products", json={
            "name": "Test Product", "price": 10.0,
        }, headers=auth_header)
        return resp.json()["id"]

    def test_create_comment_public(self, client, auth_header):
        pid = self._create_product(client, auth_header)
        resp = client.post("/api/v1/comments", json={
            "product_id": pid,
            "author_name": "John",
            "content": "Great product!",
        })
        assert resp.status_code == 201
        data = resp.json()
        assert data["author_name"] == "John"
        assert data["is_approved"] is False

    def test_create_comment_missing_product(self, client):
        resp = client.post("/api/v1/comments", json={
            "product_id": 999,
            "author_name": "Jane",
            "content": "Test",
        })
        assert resp.status_code == 404

    def test_list_comments_for_product(self, client, auth_header):
        pid = self._create_product(client, auth_header)
        client.post("/api/v1/comments", json={
            "product_id": pid, "author_name": "A", "content": "Nice",
        })
        client.post("/api/v1/comments", json={
            "product_id": pid, "author_name": "B", "content": "Good",
        })

        resp = client.get(f"/api/v1/comments?product_id={pid}")
        assert len(resp.json()) == 2

    def test_approve_comment(self, client, auth_header):
        pid = self._create_product(client, auth_header)
        create = client.post("/api/v1/comments", json={
            "product_id": pid, "author_name": "A", "content": "Cool",
        })
        cid = create.json()["id"]

        resp = client.put(f"/api/v1/comments/{cid}/approve", headers=auth_header)
        assert resp.status_code == 200
        assert resp.json()["is_approved"] is True

    def test_approve_comment_requires_auth(self, client, auth_header):
        pid = self._create_product(client, auth_header)
        create = client.post("/api/v1/comments", json={
            "product_id": pid, "author_name": "A", "content": "Cool",
        })
        cid = create.json()["id"]

        resp = client.put(f"/api/v1/comments/{cid}/approve")
        assert resp.status_code == 401

    def test_approve_nonexistent(self, client, auth_header):
        resp = client.put("/api/v1/comments/999/approve", headers=auth_header)
        assert resp.status_code == 404

    def test_delete_comment(self, client, auth_header):
        pid = self._create_product(client, auth_header)
        create = client.post("/api/v1/comments", json={
            "product_id": pid, "author_name": "A", "content": "Bad",
        })
        cid = create.json()["id"]

        resp = client.delete(f"/api/v1/comments/{cid}", headers=auth_header)
        assert resp.status_code == 204

        resp = client.get(f"/api/v1/comments?product_id={pid}")
        assert len(resp.json()) == 0

    def test_filter_approved_comments(self, client, auth_header):
        pid = self._create_product(client, auth_header)
        c1 = client.post("/api/v1/comments", json={
            "product_id": pid, "author_name": "A", "content": "X",
        }).json()
        client.put(f"/api/v1/comments/{c1['id']}/approve", headers=auth_header)
        client.post("/api/v1/comments", json={
            "product_id": pid, "author_name": "B", "content": "Y",
        })

        resp = client.get(f"/api/v1/comments?product_id={pid}&approved=true")
        assert len(resp.json()) == 1
        assert resp.json()[0]["author_name"] == "A"
