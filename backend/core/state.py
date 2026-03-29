from typing import TypedDict, List, Dict, Any, Optional

class AppState(TypedDict):
    raw_pdf_bytes: Optional[bytes]
    parsed_portfolio: Optional[List[Dict[str, Any]]]
    portfolio_intelligence: Optional[Dict[str, Any]]
    health_score: Optional[Dict[str, Any]]
    fire_plan: Optional[Dict[str, Any]]
    rebalancing_plan: Optional[Dict[str, Any]]
    final_narrative: Optional[Dict[str, Any]]
    user_profile: Optional[Dict[str, Any]]
    audit_trail: List[Dict[str, Any]]
