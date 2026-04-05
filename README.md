# ResistAI - Clinical Dashboard

A full-stack application for modern clinical engine management.

## Project Structure
- `backend/`: FastAPI Python server with Random Forest models.
- `frontend/`: Next.js dashboard UI.

## Getting Started (Windows)

To run this project on a Windows machine, follow these steps:

### 1. Install Prerequisites
- [Git](https://git-scm.com/download/win)
- [Git LFS](https://git-lfs.github.com/) (Required for large model files)
- [Python 3.10+](https://www.python.org/downloads/)
- [Node.js 18+](https://nodejs.org/en/download/)

### 2. Clone the Repository
```powershell
git clone <YOUR_REPO_URL>
cd ResistAI_final_try
git lfs pull
```

### 3. Setup Backend
1. Open a terminal in the `backend/` folder.
2. Create and activate a virtual environment:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\activate
   ```
3. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
4. Start the server:
   ```powershell
   python main.py
   ```
   *Backend starts at `http://localhost:8000`*

### 4. Setup Frontend
1. Open a new terminal in the `frontend/` folder.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the dev server:
   ```powershell
   npm run dev
   ```
   *Frontend starts at `http://localhost:3000`*

## Environment Variables
Ensure you have the correct `.env` files in `backend/` for Supabase connectivity.
