from core.state import AppState
from langchain_anthropic import ChatAnthropic
import os
import datetime
import json

def narrate_story_node(state: AppState) -> AppState:
    anthropic_key = os.environ.get("ANTHROPIC_API_KEY")
    
    if not anthropic_key:
        # Mock narrative if no key is provided
        health = state.get("health_score", {}).get("overall", 50)
        state["final_narrative"] = {
            "story": f"Your financial health currently stands at a score of {health:.1f}/100. Your portfolio is poised for growth, but immediate attention is required to optimize your returns and mitigate risks. Moving forward, taking structured steps will align your savings rate powerfully with your FIRE goals.",
            "top_actions": [
                "Switch underperforming regular plans to direct equivalents to save on expense drag.",
                "Boost your emergency fund to cover at least 6 months of expenses.",
                "Ensure your term life insurance covers 20x your annual income."
            ],
            "insight": "By systematically investing the recommended SIP amounts, you have an 82% projected chance to meet your retirement corpus.",
            "warning": "High EMI to Income ratio detected." if state.get("health_score", {}).get("debt", 100) < 50 else None
        }
        state.get("audit_trail", []).append({"agent": "Agent 6", "status": "mocked", "timestamp": str(datetime.datetime.now())})
        return state
        
    try:
        chat = ChatAnthropic(model_name="claude-3-5-sonnet-20240620", anthropic_api_key=anthropic_key)
        
        prompt = f"""
        You are MoneyMitra, an expert AI financial advisor. Read the user's data and write a cohesive financial story.
        Health Score: {state.get("health_score")}
        Portfolio: {state.get("portfolio_intelligence")}
        FIRE Plan: {state.get("fire_plan")}
        Rebalance: {state.get("rebalancing_plan")}
        
        Output strictly in JSON format with keys:
        "story": A 3-paragraph compelling narrative (1st: current state, 2nd: risks, 3rd: future if actions taken).
        "top_actions": list of 5 actionable string steps.
        "insight": 1 data-backed encouraging sentence.
        "warning": 1 severe warning string or null if none.
        DO NOT output any markdown blocks like ```json, just the raw JSON object.
        """
        
        response = chat.invoke(prompt)
        text_content = response.content.replace("```json", "").replace("```", "").strip()
        data = json.loads(text_content)
        state["final_narrative"] = data
        state.get("audit_trail", []).append({"agent": "Agent 6", "status": "success", "timestamp": str(datetime.datetime.now())})
    except Exception as e:
        state.get("audit_trail", []).append({"agent": "Agent 6", "status": "error", "error": str(e), "timestamp": str(datetime.datetime.now())})
        state["final_narrative"] = {"story": "Failed to generate narrative.", "top_actions": [], "insight": "", "warning": None}
        
    return state
