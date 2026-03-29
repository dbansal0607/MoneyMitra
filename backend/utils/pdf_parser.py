import pdfplumber
import io
import re
from typing import List, Dict, Any, Tuple
from utils.mfapi import search_scheme_code, fetch_latest_nav

def extract_portfolio_from_pdf(pdf_bytes: bytes) -> Tuple[List[Dict[str, Any]], List[str]]:
    warnings = []
    funds_dict = {}
    
    current_folio = "UNKNOWN"
    current_scheme = None
    current_amc = "UNKNOWN_AMC"
    
    try:
        with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if not text:
                    continue
                
                lines = text.split("\n")
                for line in lines:
                    line = line.strip()
                    
                    # Match Folio Number
                    folio_match = re.search(r"Folio\s*No[\s:]+([a-zA-Z0-9/-]+)", line, re.IGNORECASE)
                    if folio_match:
                        current_folio = folio_match.group(1).strip()
                        continue
                        
                    # Heuristics: scheme names often appear in uppercase or followed by "Advisor"
                    # Or lines starting with "Scheme :"
                    # CAMS format vs Karvy/KFintech format
                    if "Scheme :" in line or "Scheme Name" in line:
                        current_scheme = line.split(":", 1)[-1].strip()
                        continue
                    
                    # Another common pattern: Just a fully uppercase line containing "FUND" or "PLAN"
                    # that isn't a header
                    if ("FUND" in line.upper() or "PLAN" in line.upper()) and not "SUMMARY" in line.upper() and len(line) > 10 and "SCHEME" not in line.upper():
                        if re.match(r"^[A-Z\s\-]+$", line.split("(")[0].strip()):
                            # Might be a scheme name header
                            current_scheme = line.strip()

                    # Match transaction rows: Date (DD-MMM-YYYY), Description, Amount, Units, Price/NAV, Balance Units
                    # E.g. "12-Jan-2023 SIP Installment 5,000.00 100.000 50.0000 100.000"
                    txn_match = re.match(r"^(\d{2}-[A-Za-z]{3}-\d{4})\s+(.+?)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)$", line)
                    if txn_match and current_scheme:
                        date, desc, amount_str, price_str, units_str, bal_str = txn_match.groups()
                        
                        amount = float(amount_str.replace(",", ""))
                        price = float(price_str.replace(",", ""))
                        units = float(units_str.replace(",", ""))
                        
                        if current_scheme not in funds_dict:
                            funds_dict[current_scheme] = {
                                "scheme_name": current_scheme,
                                "amc_name": current_amc,
                                "folio_number": current_folio,
                                "transactions": []
                            }
                            
                        # Determine if purchase or redemption based on description
                        # SIP, Purchase, Switch In -> buy
                        # Redemption, Switch Out -> sell
                        txn_type = "purchase"
                        if "redemption" in desc.lower() or "switch out" in desc.lower() or "payout" in desc.lower():
                            txn_type = "redemption"
                            amount = -amount
                            units = -units
                        
                        funds_dict[current_scheme]["transactions"].append({
                            "date": date,
                            "type": txn_type,
                            "amount": amount,
                            "nav": price,
                            "units": units
                        })
                        
    except Exception as e:
        warnings.append(f"Error parsing PDF: {str(e)}")
        
    parsed_portfolio = []
    
    for scheme, data in funds_dict.items():
        transactions = data["transactions"]
        if not transactions:
            continue
            
        units_held = sum(t["units"] for t in transactions)
        invested_amount = sum(t["amount"] for t in transactions if t["amount"] > 0)
        
        # Calculate average NAV at purchase
        purchase_txns = [t for t in transactions if t["type"] == "purchase"]
        total_purchase_units = sum(t["units"] for t in purchase_txns)
        avg_nav = (invested_amount / total_purchase_units) if total_purchase_units > 0 else 0.0
        
        # Fetch live NAV
        scheme_code = search_scheme_code(scheme)
        if not scheme_code:
            warnings.append(f"Could not map {scheme} to mfapi.in code.")
        
        current_nav = fetch_latest_nav(scheme_code) if scheme_code else transactions[-1]["nav"]
        if not current_nav:
            current_nav = 0.0
            
        current_value = units_held * current_nav
        
        plan_type = "direct" if "direct" in scheme.lower() else "regular"
        option_type = "dividend" if "idcw" in scheme.lower() else "growth"
        
        parsed_portfolio.append({
            "scheme_name": scheme,
            "amc_name": data["amc_name"],
            "folio_number": data["folio_number"],
            "isin": None,
            "plan_type": plan_type,
            "option_type": option_type,
            "units_held": units_held,
            "average_nav_purchase": avg_nav,
            "invested_amount": invested_amount,
            "current_nav": current_nav,
            "current_value": current_value,
            "transactions": transactions
        })
        
    return parsed_portfolio, warnings
