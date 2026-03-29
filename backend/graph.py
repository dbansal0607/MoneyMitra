from langgraph.graph import StateGraph, START, END
from core.state import AppState
from agents.agent_1_parser import parse_document_node
from agents.agent_2_portfolio import analyze_portfolio_node
from agents.agent_3_health import score_health_node
from agents.agent_4_fire import plan_fire_node
from agents.agent_5_rebalance import advise_rebalance_node
from agents.agent_6_narrator import narrate_story_node

def route_from_start(state: AppState):
    # Determine the flow based on what is provided
    # Route 1: PDF provided (Full Flow)
    if state.get("raw_pdf_bytes"):
        return "parser"
    # Route 3: Only FIRE goals provided, no detailed profile for health score
    elif not state.get("user_profile", {}).get("monthly_income"):
        return "fire"
    # Route 2: Questionnaire provided without PDF
    else:
        return "health"

def build_graph():
    builder = StateGraph(AppState)
    
    # Add Nodes
    builder.add_node("parser", parse_document_node)
    builder.add_node("portfolio", analyze_portfolio_node)
    builder.add_node("health", score_health_node)
    builder.add_node("fire", plan_fire_node)
    builder.add_node("rebalance", advise_rebalance_node)
    builder.add_node("narrator", narrate_story_node)
    
    # Conditional Start
    builder.add_conditional_edges(START, route_from_start)
    
    # Full route edges
    builder.add_edge("parser", "portfolio")
    builder.add_edge("portfolio", "health")
    builder.add_edge("health", "fire")
    
    # Fire can route to rebalance (if health/portfolio was run) or skip to narrator
    def route_from_fire(state: AppState):
        if state.get("portfolio_intelligence") or state.get("health_score"):
            return "rebalance"
        return "narrator"
        
    builder.add_conditional_edges("fire", route_from_fire)
    builder.add_edge("rebalance", "narrator")
    builder.add_edge("narrator", END)
    
    return builder.compile()

app_graph = build_graph()
