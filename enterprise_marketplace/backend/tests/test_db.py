from sqlalchemy import inspect, text

from app.db import engine, SessionLocal, Base


class TestDatabaseSession:
    def test_engine_created(self):
        assert engine is not None

    def test_session_local_created(self):
        assert SessionLocal is not None

    def test_base_has_metadata(self):
        assert Base.metadata is not None

    def test_session_can_execute_query(self):
        db = SessionLocal()
        result = db.execute(text("SELECT 1"))
        assert result.scalar() == 1
        db.close()

    def test_tables_exist_after_create_all(self, setup_db):
        inspector = inspect(engine)
        tables = inspector.get_table_names()
        assert "admins" in tables
        assert "products" in tables
        assert "services" in tables
        assert "comments" in tables
        assert "site_interactions" in tables
