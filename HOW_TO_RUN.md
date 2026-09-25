# ClaimGuard AI — How to Run (Frontend + Backend)

This project has two parts that must run **at the same time**:

| Part | Folder | URL |
|------|--------|-----|
| Backend (FastAPI + ML model) | `backend/` | http://127.0.0.1:8000 |
| Frontend (React + Vite) | `claimguard_ai/` | http://localhost:5173 |

The frontend calls the backend at `http://localhost:8000` by default (see `claimguard_ai/src/services/apiService.js`).

---

## Prerequisites

Install on your machine:

- **Python 3.10+** — check: `python --version`
- **Node.js 18+** — check: `node --version`
- **npm** — check: `npm --version`

---

## Step 0 — One-time: trained model file (required)

The API needs **`vehicle_fraud_random_forest.pkl`**.

1. Open **`Model-Creation.ipynb`** in Jupyter / VS Code.
2. Run all cells (or at least the cell that saves the model with `joblib.dump`).
3. Place the file in **one** of these locations:
   - `backend/model/vehicle_fraud_random_forest.pkl` **(recommended)**, or
   - project root: `Insurance_Fraud_Detection/vehicle_fraud_random_forest.pkl`

If this file is missing, the backend may start but predictions will fail and `/health` will show `"model_loaded": false`.

Create the folder if needed (PowerShell, from project root):

```powershell
New-Item -ItemType Directory -Force -Path "backend\model"
Copy-Item "vehicle_fraud_random_forest.pkl" "backend\model\"
```

---

## Step 1 — Backend setup (first time only)

Open **Terminal 1** (PowerShell):

```powershell
cd "D:\dhruv\DU(clg)\sem 5\ML\Project\Insurance_Fraud_Detection\backend"

python -m venv venv

pip install -r requirements.txt
```

**Activate the virtual environment** (pick the one that matches your terminal):

| Terminal | Activate command |
|----------|------------------|
| **Command Prompt (cmd.exe)** | `venv\Scripts\activate.bat` |
| **PowerShell** | `.\venv\Scripts\Activate.ps1` |

If PowerShell blocks scripts, run once: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`

**Tip:** You can skip activation and call venv Python directly:

```text
venv\Scripts\python.exe main.py
```

---

## Step 2 — Start the backend (every time)

In **Terminal 1**, with venv activated and `cd` still in `backend/`:

**Option A (recommended):**

```powershell
python main.py
```

**Option B:**

```powershell
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

You should see logs that the model loaded. Verify in the browser or curl:

- API docs: http://127.0.0.1:8000/docs
- Health: http://127.0.0.1:8000/health → `"model_loaded": true`

Leave this terminal **running**.

---

## Step 3 — Frontend setup (first time only)

Open **Terminal 2** (PowerShell):

```powershell
cd "D:\dhruv\DU(clg)\sem 5\ML\Project\Insurance_Fraud_Detection\claimguard_ai"

npm install
```

---

## Step 4 — Start the frontend (every time)

In **Terminal 2**, still in `claimguard_ai/`:

```powershell
npm run dev
```

Open: **http://localhost:5173**

Use **Predict** for live ML inference and **Analytics** for model metrics from the API.

Leave this terminal **running**.

---

## Step 5 — Quick API checks (optional)

With the backend running:

```powershell
curl http://127.0.0.1:8000/health
curl http://127.0.0.1:8000/analytics/model
curl http://127.0.0.1:8000/model-info
```

Or use **POST /predict** from http://127.0.0.1:8000/docs → **Try it out** with the example JSON.

---

## Daily workflow (summary)

1. **Terminal 1:** `cd backend` → `.\venv\Scripts\Activate.ps1` → `python main.py`
2. **Terminal 2:** `cd claimguard_ai` → `npm run dev`
3. Browser: http://localhost:5173

Stop servers with **Ctrl+C** in each terminal.

---

## Optional: point frontend to a different backend URL

Create `claimguard_ai/.env`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Restart `npm run dev` after changing `.env`.

---

## Production build (frontend only)

```powershell
cd claimguard_ai
npm run build
npm run preview
```

Set `VITE_API_URL` to your deployed backend URL before `npm run build`.

---

## Troubleshooting

| Problem | What to do |
|---------|------------|
| `Unable to connect... localhost:8000` | Start backend first (`python main.py` from `backend/`). |
| `model_loaded: false` | Add `vehicle_fraud_random_forest.pkl` under `backend/model/`. |
| `ModuleNotFoundError` on backend | Activate venv and `pip install -r requirements.txt`. Run uvicorn/`main.py` from **`backend/`**, not project root. |
| CORS errors in browser | Backend only allows listed dev origins; use http://localhost:5173 (not a random port unless you add it in `backend/main.py`). |
| Analytics works but Predict fails | Usually missing or broken model file; check `/health`. |

---

## API endpoints reference

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/health` | Service + model load status |
| GET | `/model-info` | Model metadata |
| GET | `/analytics/model` | Evaluation metrics |
| POST | `/predict` | Fraud risk prediction |
