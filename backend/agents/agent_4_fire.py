from core.state import AppState
import datetime
import numpy as np

def plan_fire_node(state: AppState) -> AppState:
    profile = state.get("user_profile")
    if not profile:
        profile = {"monthly_expenses": 50000, "goals": [{"name": "Retirement", "target": 50000000, "years": 20}]}
        
    expenses = profile.get("monthly_expenses", 50000)
    fire_number = (expenses * 12) / 0.04
    
    goals = profile.get("goals", [])
    fire_plan = {
        "fire_number": fire_number,
        "goals": []
    }
    
    for goal in goals:
        target = goal["target"]
        years = goal["years"]
        inflated_target = target * (1.06 ** years)
        
        # Monte Carlo Simulation
        n_sims = 1000
        returns = np.random.normal(0.12, 0.08, (n_sims, max(1, years)))
        portfolio = np.zeros(n_sims)
        
        # Approximate required SIP assuming 12% compounding
        monthly_sip = inflated_target * (0.01) / (((1.01)**(years*12)) - 1) if years > 0 else 0
        
        for y in range(years):
            portfolio = (portfolio + (monthly_sip * 12)) * (1 + returns[:, y])
            
        prob_success = np.mean(portfolio >= inflated_target) * 100
        p10 = float(np.percentile(portfolio, 10))
        p50 = float(np.percentile(portfolio, 50))
        p90 = float(np.percentile(portfolio, 90))
        
        fire_plan["goals"].append({
            "name": goal["name"],
            "inflated_target": inflated_target,
            "required_sip": monthly_sip,
            "prob_success": prob_success,
            "p10": p10,
            "p50": p50,
            "p90": p90
        })
        
    state["fire_plan"] = fire_plan
    state.get("audit_trail", []).append({"agent": "Agent 4", "status": "success", "timestamp": str(datetime.datetime.now())})
    return state
