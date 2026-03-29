import uvicorn
from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
from graph import app_graph
from core.state import AppState

app = FastAPI(title="MoneyMitra API", description="Backend for MoneyMitra AI Financial Advisor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class FireProfile(BaseModel):
    goals: list
    monthly_expenses: float

class HealthProfile(BaseModel):
    monthly_income: float
    monthly_expenses: float
    liquid_savings: float
    outstanding_loans: float
    monthly_emis: float
    life_insurance: float
    health_insurance: float
    age: int
    goals: list

@app.get("/health")
async def health_check():
    return {"status": "ok", "message": "MoneyMitra backend is running"}

@app.post("/api/analyze-portfolio")
async def analyze_portfolio(
    file: UploadFile = File(...),
    profile: str = Form("{}")
):
    pdf_bytes = await file.read()
    user_profile = json.loads(profile)
    
    state: AppState = {
        "raw_pdf_bytes": pdf_bytes,
        "user_profile": user_profile,
        "audit_trail": []
    }
    
    result = await app_graph.ainvoke(state)
    
    if "raw_pdf_bytes" in result:
        del result["raw_pdf_bytes"]
        
    return result

@app.post("/api/health-score")
async def get_health_score(profile: HealthProfile):
    state: AppState = {
        "raw_pdf_bytes": None,
        "user_profile": profile.model_dump(),
        "audit_trail": []
    }
    result = await app_graph.ainvoke(state)
    return result

@app.post("/api/fire-plan")
async def get_fire_plan(profile: FireProfile):
    state: AppState = {
        "raw_pdf_bytes": None,
        "user_profile": {"monthly_expenses": profile.monthly_expenses, "goals": profile.goals},
        "audit_trail": []
    }
    result = await app_graph.ainvoke(state)
    return result

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
