Phase 1: Project Scaffolding & Environment Setup
Focus: Creating the folder structure, initializing repositories, and setting up the basic development environment.
Action 1: Initialize the root directory enterprise_marketplace.
Action 2: Scaffold the FastAPI backend (Python virtual environment, requirements.txt, main.py).
Action 3: Scaffold the frontend using Vite + React (npm create vite@latest).
Action 4: Install baseline frontend dependencies (Tailwind CSS, Framer Motion, React Router, Axios).
Action 5: Create the foundational docker-compose.yml for local development.


Phase 2: Test Scripts & Quality Validation
Focus: Establishing a test phase for the project with scripts for backend, frontend, and integration checks.
Action 1: Add backend unit tests for API services, models, and authentication flows using pytest.
Action 2: Add frontend component tests with React Testing Library for key pages and shared UI components.
Action 3: Add integration tests for the backend API endpoints using httpx or FastAPI TestClient.
Action 4: Create npm scripts and Python scripts to run all test suites locally, e.g. `npm test`, `pytest`, and `npm run test:ci`.
Action 5: Document the test phase in development guides and add a checklist for test coverage and passing QA.

Phase 3: Database & Backend Data Layer
Focus: Setting up SQLite for development, defining SQLAlchemy models, and Pydantic schemas.
Action 1: Configure the database connection string and session maker in backend/app/db.
Action 2: Write SQLAlchemy models for Admin, Product, Service, Comment, and SiteInteraction.
Action 3: Write the corresponding Pydantic schemas (e.g., ProductCreate, ProductResponse) for validation.
Action 4: Set up Alembic for database migrations and generate the initial migration.

Phase 4: Backend API Endpoints & Authentication
Focus: Building the business logic and exposing RESTful routes.
Action 1: Implement JWT authentication (login endpoint, password hashing, dependency for secure routes).
Action 2: Build CRUD endpoints for Products and Services (include image URL handling).
Action 3: Build endpoints for Comments (creation for public users, approval/deletion for admins).
Action 4: Build the Site Interaction logging middleware/endpoint.
Action 5: Test APIs using FastAPI’s interactive Swagger UI.

Phase 5: Frontend Architecture & Routing
Focus: Establishing the React structure, navigation, and core components without heavy styling yet.
Action 1: Set up React Router in App.jsx with routes for Home, Products, Services, About, Contact, and Admin.
Action 2: Create placeholder components for all pages in src/pages.
Action 3: Build reusable global layout components: Navbar, Footer, and WhatsAppFloatingButton.
Action 4: Create the API client (src/services/api.js) using Axios, pre-configured with the backend URL and interceptors for the JWT token.

Phase 6: Public UI Construction & Data Integration
Focus: Building the customer-facing views and connecting them to the live backend data.
Action 1: Develop the Home Page (Hero section, Stats bar, Featured Services/Products grids).
Action 2: Develop the Products Page (Implement category filtering and the Terra & Vine-inspired product cards).
Action 3: Develop the Individual Product Page (Details, image, and the public comment submission form).
Action 4: Develop the Services, About, and Contact pages (incorporating the company heritage and WhatsApp/Email links).

Phase 7: Admin Dashboard & Secure State
Focus: Giving the owner control over their marketplace data.
Action 1: Build the Admin Login view and wire it to the JWT auth context.
Action 2: Create the main Admin Dashboard (displaying interaction stats and pending comments).
Action 3: Develop the Product Management UI (forms to add, edit, and delete products, including toggle for special offers).
Action 4: Develop the Comment Moderation UI (buttons to approve or reject customer feedback).

Phase 8: Styling Polish & Animation
Focus: Refining the UI/UX based on the "design inspiration" notes.
Action 1: Apply the muted earth tones, clean typography, and specific card designs to match the provided UI reference.
Action 2: Integrate Framer Motion for smooth page transitions, carousel sliding, and interactive hover states on cards.
Action 3: Perform a comprehensive responsive design audit to ensure it works perfectly on mobile phones (crucial for WhatsApp integration).

Phase 9: Production Deployment Readiness
Focus: Moving from local development to the live server.
Action 1: Swap the backend database configuration from SQLite to PostgreSQL.
Action 2: Finalize the Dockerfile for the backend and the multi-stage build for the Vite frontend (using Nginx to serve static files).
Action 3: Write the production docker-compose.yml.
Action 4: Configure Let's Encrypt for SSL certificates to secure admin logins and customer data.