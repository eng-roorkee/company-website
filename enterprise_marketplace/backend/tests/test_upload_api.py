JPEG_HEADER = b"\xff\xd8\xff\xe0"
PNG_HEADER = b"\x89PNG\r\n\x1a\n"
WEBP_HEADER = b"RIFF\x00\x00\x00\x00WEBPVP8 "
GIF_HEADER = b"GIF89a\x01\x00\x01\x00"


class TestUploadAPI:
    def test_upload_requires_auth(self, client):
        resp = client.post("/api/v1/upload", files={"file": ("test.jpg", JPEG_HEADER, "image/jpeg")})
        assert resp.status_code == 401

    def test_upload_jpeg(self, client, auth_header):
        resp = client.post(
            "/api/v1/upload",
            files={"file": ("test.jpg", JPEG_HEADER, "image/jpeg")},
            headers=auth_header,
        )
        assert resp.status_code == 200
        data = resp.json()
        assert data["url"].startswith("/static/uploads/")
        assert data["url"].endswith(".jpg")

    def test_upload_png(self, client, auth_header):
        resp = client.post(
            "/api/v1/upload",
            files={"file": ("test.png", PNG_HEADER, "image/png")},
            headers=auth_header,
        )
        assert resp.status_code == 200
        assert resp.json()["url"].endswith(".png")

    def test_upload_webp(self, client, auth_header):
        resp = client.post(
            "/api/v1/upload",
            files={"file": ("test.webp", WEBP_HEADER, "image/webp")},
            headers=auth_header,
        )
        assert resp.status_code == 200
        assert resp.json()["url"].endswith(".webp")

    def test_upload_gif(self, client, auth_header):
        resp = client.post(
            "/api/v1/upload",
            files={"file": ("test.gif", GIF_HEADER, "image/gif")},
            headers=auth_header,
        )
        assert resp.status_code == 200
        assert resp.json()["url"].endswith(".gif")

    def test_upload_rejects_invalid_type(self, client, auth_header):
        resp = client.post(
            "/api/v1/upload",
            files={"file": ("test.txt", b"hello", "text/plain")},
            headers=auth_header,
        )
        assert resp.status_code == 400
        assert "Invalid file type" in resp.json()["detail"]

    def test_upload_rejects_content_mismatch(self, client, auth_header):
        resp = client.post(
            "/api/v1/upload",
            files={"file": ("test.jpg", b"not-a-real-jpeg", "image/jpeg")},
            headers=auth_header,
        )
        assert resp.status_code == 400
        assert "does not match" in resp.json()["detail"]

    def test_upload_rejects_oversized_file(self, client, auth_header):
        big = JPEG_HEADER + b"x" * (6 * 1024 * 1024)
        resp = client.post(
            "/api/v1/upload",
            files={"file": ("big.jpg", big, "image/jpeg")},
            headers=auth_header,
        )
        assert resp.status_code == 413

    def test_upload_rejects_empty_file(self, client, auth_header):
        resp = client.post(
            "/api/v1/upload",
            files={"file": ("empty.jpg", b"", "image/jpeg")},
            headers=auth_header,
        )
        assert resp.status_code == 400

    def test_upload_rejects_svg(self, client, auth_header):
        resp = client.post(
            "/api/v1/upload",
            files={"file": ("test.svg", b"<svg></svg>", "image/svg+xml")},
            headers=auth_header,
        )
        assert resp.status_code == 400

    def test_create_product_with_image_url(self, client, auth_header):
        resp = client.post(
            "/api/v1/products",
            json={
                "name": "Beef with Photo",
                "description": "Premium beef with uploaded photo",
                "price": 30.0,
                "category": "Beef",
                "image_url": "/static/uploads/test-beef.jpg",
                "is_special_offer": False,
            },
            headers=auth_header,
        )
        assert resp.status_code == 201
        data = resp.json()
        assert data["name"] == "Beef with Photo"
        assert data["image_url"] == "/static/uploads/test-beef.jpg"
        assert data["price"] == 30.0

    def test_list_products_returns_image_url(self, client, auth_header):
        client.post(
            "/api/v1/products",
            json={
                "name": "Product A",
                "price": 15.0,
                "image_url": "/static/uploads/photo-a.jpg",
                "category": "Poultry",
            },
            headers=auth_header,
        )
        client.post(
            "/api/v1/products",
            json={
                "name": "Product B",
                "price": 20.0,
                "category": "Beef",
            },
            headers=auth_header,
        )

        resp = client.get("/api/v1/products")
        data = resp.json()
        assert len(data) == 2

        with_photo = next(p for p in data if p["name"] == "Product A")
        assert with_photo["image_url"] == "/static/uploads/photo-a.jpg"

        without_photo = next(p for p in data if p["name"] == "Product B")
        assert without_photo["image_url"] is None

    def test_update_product_image_url(self, client, auth_header):
        create = client.post(
            "/api/v1/products",
            json={"name": "Test", "price": 10.0},
            headers=auth_header,
        )
        pid = create.json()["id"]

        resp = client.put(
            f"/api/v1/products/{pid}",
            json={"image_url": "/static/uploads/updated-photo.jpg"},
            headers=auth_header,
        )
        assert resp.status_code == 200
        assert resp.json()["image_url"] == "/static/uploads/updated-photo.jpg"

    def test_create_product_with_image_url_and_special_offer(self, client, auth_header):
        resp = client.post(
            "/api/v1/products",
            json={
                "name": "Special Beef",
                "price": 45.0,
                "image_url": "/static/uploads/special.jpg",
                "category": "Beef",
                "is_special_offer": True,
            },
            headers=auth_header,
        )
        assert resp.status_code == 201
        data = resp.json()
        assert data["image_url"] == "/static/uploads/special.jpg"
        assert data["is_special_offer"] is True

    def test_list_products_filters_with_image(self, client, auth_header):
        client.post(
            "/api/v1/products",
            json={"name": "With Image", "price": 10.0, "image_url": "/img.jpg", "category": "Beef"},
            headers=auth_header,
        )
        client.post(
            "/api/v1/products",
            json={"name": "No Image", "price": 5.0, "category": "Poultry"},
            headers=auth_header,
        )
        resp = client.get("/api/v1/products?category=Beef")
        assert len(resp.json()) == 1
        assert resp.json()[0]["image_url"] == "/img.jpg"
