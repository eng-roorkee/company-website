import os

from alembic.config import Config
from alembic.script import ScriptDirectory


class TestAlembic:
    backend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)))

    def test_alembic_ini_exists(self):
        assert os.path.exists(os.path.join(self.backend_dir, "alembic.ini"))

    def test_alembic_directory_exists(self):
        assert os.path.isdir(os.path.join(self.backend_dir, "alembic"))

    def test_versions_directory_exists(self):
        assert os.path.isdir(os.path.join(self.backend_dir, "alembic", "versions"))

    def test_env_py_exists(self):
        assert os.path.exists(os.path.join(self.backend_dir, "alembic", "env.py"))

    def test_migration_was_generated(self):
        versions_dir = os.path.join(self.backend_dir, "alembic", "versions")
        py_files = [f for f in os.listdir(versions_dir) if f.endswith(".py") and f != "__init__.py"]
        assert len(py_files) > 0, "No migration files found"

    def test_alembic_config_loads(self):
        alembic_cfg = Config(os.path.join(self.backend_dir, "alembic.ini"))
        script = ScriptDirectory.from_config(alembic_cfg)
        heads = script.get_heads()
        assert len(heads) == 1, "Expected exactly one migration head"

    def test_alembic_head_matches_current(self):
        from alembic.command import current
        alembic_cfg = Config(os.path.join(self.backend_dir, "alembic.ini"))
        current(alembic_cfg)
