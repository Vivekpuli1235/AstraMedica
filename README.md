# 🔬 Astra Medica

<div align="center">
  <h3>Next-Generation AI-Powered Health Analysis & Diagnostic Platform</h3>
  <p>A comprehensive Final Year Academic Project combining Advanced Deep Learning, Computer Vision, and Asynchronous Web Architectures to deliver real-time predictive clinical screening.</p>
</div>

---

## ✨ Project Overview

**Astra Medica** bridges the gap between raw medical data and intelligent preliminary screening. Designed to assist healthcare practitioners and patients alike, the application accepts standard tabular blood parameters alongside radiological imagery (X-rays) to flag potential pathological risks with speed, reliability, and full statistical confidence outputs.

---

## 🧬 Core Modules & Capabilities

### 🩸 1. Comprehensive Blood Report Analysis
- **Machine Learning Core**: Employs a finely-tuned multi-class neural network (`blood_model.keras`) alongside custom robust standard scaling (`scaler.pkl`).
- **19 Input Parameters Evaluated**: Automatically parses vital counts including Hemoglobin (**Hb**), Red & White Blood Cells (**RBC/WBC**), Platelets, MCV, Blood Pressure (**BP**), BMI, Creatinine, Bilirubin, Liver Enzymes (**ALT/AST**), and **HbA1c**.
- **Multi-Disease Prediction**: Instantly classifies diagnostic vectors across primary conditions:
  - 🟢 **Healthy**
  - 🔴 **Anemia**
  - 🟠 **Diabetes**
  - 🫀 **Heart Disease**
  - 🩺 **Kidney Disease**
  - 🟡 **Liver Issues**

### 🩻 2. Automated Lung X-Ray Screening
- Accepts standard patient chest radiography images.
- Implements spatial deep learning logic to pre-screen opacities, localized signs of pneumonia, and general respiratory structural defects.

### 🦴 3. Bone Breakage & Fracture Analysis
- High-fidelity visual parser targeting orthopedic imaging.
- Assists in detecting subtle fractures, stress separations, and traumatic micro-breaks instantly upon upload.

### ⏰ 4. Smart Medication Alarm & Scheduler
- Complete persistent schedule tracking for patient medications.
- Configure dosages, fixed time triggers, custom repetition frequencies, and inline doctor notes.
- Fully backed by a dedicated real-time NoSQL storage collection.

### 🔐 5. Secure Identity Management
- **Stateless Verification**: Features fully asynchronous registration and login flows protected by SHA-256 standard digests and encrypted JSON Web Tokens (**JWT**).
- **Persistent Audit Logging**: All successful prediction vectors are automatically indexed into archival records mapping user session timestamps.

---

## 🏗️ System Architecture & Technology Stack

```
┌────────────────────────────────────────────────────────┐
│                   Frontend (React 19)                  │
│       Vite │ Lucide React Components │ Glassmorphism   │
└───────────────────────────┬────────────────────────────┘
                            │ Axios / REST Headers
                            ▼
┌────────────────────────────────────────────────────────┐
│                  Backend API (FastAPI)                 │
│         Uvicorn Asynchronous Task Loop │ PyJWT         │
└──────┬──────────────────────────────────────────┬──────┘
       │ Motor AsyncIO                            │ TensorFlow / Keras
       ▼                                          ▼
┌───────────────┐                        ┌───────────────┐
│  MongoDB DB   │                        │ ML Inference  │
│  Collections: │                        │ blood_model   │
│  - users      │                        │ model.pth     │
│  - predictions│                        │ scaler.pkl    │
│  - medications│                        └───────────────┘
└───────────────┘
```

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Client UI** | React 19, Vite, Tailwind CSS | Ultra-fast rendering, modern hooks paradigm, and premium medical-grade visual aesthetics. |
| **REST Router** | FastAPI (Python) | High-throughput async routing natively compatible with Pydantic type definitions. |
| **ML Inference**| TensorFlow, PyTorch, Scikit-Learn | Deep tensor execution engines parsing binary payloads and numerical arrays. |
| **Database** | MongoDB (Motor AsyncIO) | Highly scalable document schema architecture adapting perfectly to flexible diagnostics structures. |

---

## 🚀 Running the Project Locally

Follow these instructions to set up the backend AI inference engine and frontend presentation environment on your local system.

### Prerequisites
- **Python 3.10+**
- **Node.js** (v20+ recommended)
- **MongoDB Server** running locally on standard port `27017`

---

### Step 1: Start the FastAPI Backend Server
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Activate your virtual environment (if available) and install dependencies (e.g., `fastapi`, `uvicorn`, `tensorflow`, `motor`, `pyjwt`, `pydantic`).
3. Run the application via **Uvicorn**:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
   *The backend documentation will automatically compile interactively at: **`http://localhost:8000/docs`***

---

### Step 2: Start the React Frontend Client
1. Open a separate terminal window and navigate to the frontend workspace:
   ```bash
   cd frontend
   ```
2. Install client dependencies:
   ```bash
   npm install
   ```
3. Boot the local development preview:
   ```bash
   npm run dev
   ```
   *Access the web dashboard interface directly at: **`http://localhost:5173`***

---

## 🗄️ Primary API Routes

### Authentication
- `POST /register` — Submit account payloads (`name`, `email`, `password`).
- `POST /login` — Retrieve long-lived signed session Bearer tokens.

### Clinical Engines
- `POST /predict` — Submit formatted array requests encapsulating the 19 biological feature columns. Returns real-time disease predictions alongside floating-point confidence weights.

### Medication Management
- `POST /medications` — Register a persistent medication timer sequence.
- `GET /medications` — Query fully populated, reverse-chronological schedules.
- `DELETE /medications/{med_id}` — Drop specific routines securely via distinct standard Object IDs.

---

## 🎓 Academic Contribution
Developed as a capstone university final year project aimed at proving the viability of cloud-native machine learning endpoints working cooperatively with modern asynchronous single-page web applications.
