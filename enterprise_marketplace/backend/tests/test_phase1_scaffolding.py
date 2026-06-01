import json
import os


class TestPhase1Scaffolding:
    backend_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)))

    def test_backend_main_py_exists(self):
        assert os.path.exists(os.path.join(self.backend_dir, "main.py"))

    def test_backend_requirements_txt_exists(self):
        assert os.path.exists(os.path.join(self.backend_dir, "requirements.txt"))

    def test_backend_dockerfile_exists(self):
        assert os.path.exists(os.path.join(self.backend_dir, "Dockerfile"))

    def test_backend_dotenv_exists(self):
        assert os.path.exists(os.path.join(self.backend_dir, ".env"))

    def test_backend_app_dir_structure(self):
        app_dir = os.path.join(self.backend_dir, "app")
        assert os.path.isdir(app_dir)
        for sub in ["api", "core", "db", "models", "schemas", "services"]:
            assert os.path.isdir(os.path.join(app_dir, sub)), f"Missing app/{sub}"

    def test_backend_venv_exists(self):
        venv_python = os.path.join(self.backend_dir, "venv", "bin", "python")
        assert os.path.exists(venv_python)

    def test_backend_gitignore_exists(self):
        assert os.path.exists(os.path.join(self.backend_dir, ".gitignore"))

    def test_frontend_package_json_exists(self):
        frontend_dir = os.path.join(self.backend_dir, "..", "frontend")
        assert os.path.exists(os.path.join(frontend_dir, "package.json"))

    def test_frontend_vite_config_exists(self):
        frontend_dir = os.path.join(self.backend_dir, "..", "frontend")
        assert os.path.exists(os.path.join(frontend_dir, "vite.config.js"))

    def test_frontend_src_structure(self):
        src_dir = os.path.join(self.backend_dir, "..", "frontend", "src")
        for sub in ["pages", "components", "services"]:
            assert os.path.isdir(os.path.join(src_dir, sub)), f"Missing src/{sub}"

    def test_frontend_api_client_exists(self):
        api_path = os.path.join(
            self.backend_dir, "..", "frontend", "src", "services", "api.js"
        )
        assert os.path.exists(api_path)

    def test_docker_compose_exists(self):
        compose_path = os.path.join(
            self.backend_dir, "..", "deployments", "docker-compose.yml"
        )
        assert os.path.exists(compose_path)

    def test_backend_dependencies_installed(self):
        import importlib
        for pkg in ["fastapi", "uvicorn", "sqlalchemy", "pydantic", "bcrypt", "jose"]:
            importlib.import_module(pkg)

    def test_frontend_dependencies_installed(self):
        frontend_dir = os.path.join(self.backend_dir, "..", "frontend")
        pkg_json = os.path.join(frontend_dir, "package.json")
        with open(pkg_json) as f:
            pkg = json.load(f)
        deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
        for dep in ["react-router-dom", "axios", "framer-motion", "tailwindcss", "@tailwindcss/vite"]:
            assert dep in deps, f"Missing frontend dependency: {dep}"
