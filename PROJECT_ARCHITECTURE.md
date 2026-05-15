# 🏥 Astra Medica: Comprehensive Technical Architecture & Project Stack

**Astra Medica** is a state-of-the-art clinical inference and patient management platform designed as a final year academic showcase. It seamlessly bridges deep learning diagnostic modules with a premium, accessible web user interface.

Below is an exhaustive explanation of the architectural paradigms, frameworks, and libraries utilized across the frontend and backend ecosystems.

---

## 💻 Frontend Ecosystem

The frontend client is architected to prioritize high-fidelity visuals, robust client-side state machines, and medical-grade data accessibility.

### 1. Core Framework & Build Tooling
*   **React 19**: Leverages modern functional component patterns, custom Hooks for side-effect isolation, and reactive UI updates.
*   **Vite**: Utilized as the ultra-fast build tool and development server, ensuring instantaneous Hot Module Replacement (HMR) and optimized production bundles.

### 2. Design System & Theming
*   **Vanilla CSS with Glassmorphism**: Custom tokens define frosted-glass panels (`backdrop-filter: blur(20px)`), smooth drop-shadow curves, and responsive flex/grid wrappers.
*   **Dual-Theme Engine**: Fully supports real-time switching between **Dark Mode** (deep clinical slate palettes) and **Light Mode** (high-contrast, pristine white layouts) driven by CSS custom property scoping (`[data-theme="light"]`) and persistent browser storage (`localStorage`).
*   **Modern Typography**: Utilizes responsive clamp scaling and sleek sans-serif typography paired with animated linear gradients for critical status indicators.
*   **Lucide React**: Supplies clean, scalable vector iconographies representing medical tools, anatomical scopes, and navigation elements.

### 3. Application Flow & Routing Guard
*   **Introductory Splash Gate**: Greets new clients with an immersive parameter showcase (`WelcomeSplash.jsx`) before requesting system entry.
*   **Sequential Authorization**: Forces unauthenticated traffic through secure Login or Account Creation gateways prior to accessing core diagnostics.
*   **Smart Returning User Bypass**: Checks local session tokens instantly on component mount to route returning clinical personnel directly to the primary module layout.

---

## ⚙️ Backend Ecosystem

The server environment operates as an asynchronous, high-throughput REST API serving diagnostic calculations and coordinating non-relational database records.

### 1. Server Framework
*   **FastAPI**: A high-performance Python framework chosen for its automatic OpenAPI (Swagger) documentation generation, robust request validation via Pydantic schemas, and built-in support for asynchronous endpoint operations.
*   **Uvicorn**: Runs the ASGI server engine to handle concurrent HTTP connections efficiently.

### 2. Database Persistence Layer
*   **MongoDB (Motor Driver)**: An asynchronous NoSQL database utilized to ensure low latency. It houses two primary collections:
    *   `users_collection`: Securely stores registered clinical credentials, customized display identifiers, and timestamp histories.
    *   `medications_collection`: Tracks persistent user-defined prescriptions, recurring scheduling loops, and custom instructions.

### 3. Cryptography & Session Management
*   **JWT (JSON Web Tokens)**: Issues cryptographically signed bearer tokens upon valid credential submissions with fixed expiration windows.
*   **Secure Password Hashing**: Applies immutable **SHA-256** hashing workflows to discard plain-text submission vectors instantly upon database writes.

### 4. Machine Learning & Inference Engines
The backend embeds deep neural network inference endpoints directly into the request pipeline:
*   **TensorFlow / Keras Backend**: Parses and executes multi-layered model weights (e.g., `blood_model.keras`) to run inferences across patient hematology vectors.
*   **Scikit-Learn Preprocessing**: Transforms raw physiological input features using serialized scaling distributions (`scaler.pkl`) to guarantee input parity with model training sets.
*   **Image Processing Pipelines**: Handles multi-part byte streams for chest radiograph analysis (Pneumonia classification) and orthopedic scans (Bone breakage identification).

---

## 🚀 Complete Full-Stack Workflow

```
[ Frontend Client ] 
        │
        ├─► 1. Splash Landing ──► Press Enter ──► Auth Gateway (Login/Register)
        │
        ├─► 2. API Request (JWT Bearer Token Attached)
        │         │
        │         ▼
[ FastAPI Backend Engine ]
        │
        ├─► Validation Checks (Pydantic / Security Hooks)
        ├─► MongoDB Asynchronous Reads/Writes
        └─► TensorFlow Deep Learning Inference Calculation
                  │
                  ▼
[ JSON Response Payload Delivered Instantaneously to Frontend Cards ]
```
