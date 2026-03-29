import requests
import urllib.parse
from typing import Dict, Any, Optional

MFAPI_SEARCH_URL = "https://api.mfapi.in/mf/search?q={}"
MFAPI_SCHEME_URL = "https://api.mfapi.in/mf/{}"

def search_scheme_code(scheme_name: str) -> Optional[int]:
    """Search for a scheme code on mfapi.in by name"""
    try:
        # Simplify scheme name to increase match probability
        query = urllib.parse.quote(scheme_name[:20]) # First 20 chars
        res = requests.get(MFAPI_SEARCH_URL.format(query), timeout=5)
        if res.status_code == 200:
            data = res.json()
            if data and len(data) > 0:
                # Return highest match (first item usually)
                return data[0].get("schemeCode")
    except Exception as e:
        print(f"Error searching mfapi: {e}")
    return None

def fetch_latest_nav(scheme_code: int) -> Optional[float]:
    """Fetch latest NAV for a scheme code"""
    try:
        res = requests.get(MFAPI_SCHEME_URL.format(scheme_code), timeout=5)
        if res.status_code == 200:
            data = res.json()
            if data and "data" in data and len(data["data"]) > 0:
                return float(data["data"][0]["nav"])
    except Exception as e:
        print(f"Error fetching NAV: {e}")
    return None

def fetch_fund_data(scheme_code: int) -> Dict[str, Any]:
    """Fetch all available fund details from mfapi"""
    try:
        res = requests.get(MFAPI_SCHEME_URL.format(scheme_code), timeout=5)
        if res.status_code == 200:
            return res.json().get("meta", {})
    except Exception:
        pass
    return {}
