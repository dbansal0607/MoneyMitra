from core.state import AppState
import datetime

def score_health_node(state: AppState) -> AppState:
    profile = state.get("user_profile")
    if not profile:
        profile = {"monthly_income": 100000, "monthly_expenses": 50000, "liquid_savings": 100000, "outstanding_loans": 0, "monthly_emis": 0, "age": 30}
        
    income = profile.get("monthly_income", 100000)
    expenses = profile.get("monthly_expenses", 50000)
    savings = profile.get("liquid_savings", 200000)
    loans = profile.get("outstanding_loans", 0)
    emis = profile.get("monthly_emis", 0)
    life_cover = profile.get("life_insurance", 0)
    health_cover = profile.get("health_insurance", 0)
    age = profile.get("age", 30)
    
    # 1. Emergency Fund Score
    months_cover = savings / expenses if expenses > 0 else 6
    ef_score = min(100, (months_cover / 6) * 100) if months_cover >= 1 else 0
    
    # 2. Insurance Coverage Score
    life_target = income * 12 * 20
    life_score = 100 if life_cover >= life_target else (life_cover / life_target) * 100 if life_target > 0 else 0
    health_score = 100 if health_cover >= 1000000 else (health_cover / 1000000) * 100
    ins_score = (life_score + health_score) / 2
    
    # 3. Investment Diversification vs Age
    target_equity = max(0, 100 - age)
    intel = state.get("portfolio_intelligence", {})
    if intel and intel.get("total_current_value", 0) > 0:
        eq_alloc = sum([v for k,v in intel.get("category_allocation", {}).items() if "cap" in k]) / intel["total_current_value"] * 100
        div_score = max(0, 100 - abs(target_equity - eq_alloc))
    else:
        div_score = 50
        
    # 4. Debt Health
    emi_ratio = emis / income if income > 0 else 0
    if emi_ratio <= 0.3:
        debt_score = 100
    elif emi_ratio > 0.6:
        debt_score = 0
    else:
        debt_score = 100 - ((emi_ratio - 0.3) / 0.3) * 100
        
    # 5. Tax Efficiency
    tax_score = profile.get("tax_score", 80)
    
    # 6. Retirement Readiness
    req_corpus = expenses * 12 * 25
    curr_corpus = intel.get("total_current_value", 0) if intel else savings
    ret_score = min(100, (curr_corpus / req_corpus) * 100 if req_corpus > 0 else 100)
    
    overall = (ef_score*0.2 + ins_score*0.2 + div_score*0.15 + debt_score*0.2 + tax_score*0.1 + ret_score*0.15)
    
    state["health_score"] = {
        "overall": overall,
        "emergency": ef_score,
        "insurance": ins_score,
        "diversification": div_score,
        "debt": debt_score,
        "tax": tax_score,
        "retirement": ret_score,
        "action_items": []
    }
    
    if ef_score < 50:
        state["health_score"]["action_items"].append("Build emergency fund to 6 months expenses.")
    if emi_ratio > 0.5:
        state["health_score"]["action_items"].append("Focus on aggressive debt repayment; EMIs are dangerously high.")
        
    state.get("audit_trail", []).append({"agent": "Agent 3", "status": "success", "timestamp": str(datetime.datetime.now())})
    return state
