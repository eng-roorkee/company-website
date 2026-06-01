from app.core.config import settings


class TestConfig:
    def test_settings_load_from_env(self):
        assert settings.DATABASE_URL is not None
        assert settings.SECRET_KEY is not None
        assert settings.ALGORITHM == "HS256"
        assert settings.ACCESS_TOKEN_EXPIRE_MINUTES == 30

    def test_database_url_is_sqlite(self):
        assert "sqlite" in settings.DATABASE_URL
