from core.state import AppState
import datetime

def advise_rebalance_node(state: AppState) -> AppState:
    intel = state.get("portfolio_intelligence")
    actions = []

    if intel:
        for fund in intel.get("funds", []):
            if fund["plan_type"] == "regular":
                actions.append({
                    "type": "switch",
                    "fund": fund["scheme_name"],
                    "reason": f"Switch to Direct Plan to save on expense ratio. Estimated 20y savings: ₹{fund.get('direct_switch_savings_20y', 0):,.0f}",
                    "tax_implication": "Check LTCG/STCG before switching.",
                    "amount": fund["current"]
                })
                
        for warning in intel.get("overlap_warnings", []):
            actions.append({
                "type": "exit",
                "fund": "Overlapping Fund",
                "reason": warning,
                "tax_implication": "STCG 20% if < 1yr, else LTCG 12.5%",
                "amount": 0
            })
            
    state["rebalancing_plan"] = {"steps": actions}
    state.get("audit_trail", []).append({"agent": "Agent 5", "status": "success", "timestamp": str(datetime.datetime.now())})
    return state
