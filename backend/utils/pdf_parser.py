import pdfplumber  # type: ignore
import io
import re
from utils.mfapi import search_scheme_code, fetch_latest_nav  # type: ignore

def extract_portfolio_from_pdf(pdf_bytes):
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
                        
                    # Improved scheme detection (handles "Scheme:", "Scheme :", or just "Scheme Name")
                    if "Scheme" in line and ":" in line:
                        current_scheme = line.split(":", 1)[-1].strip()
                        print(f"DEBUG: Found Scheme: {current_scheme}")
                        continue
                    
                    # Extract Current NAV if explicitly mentioned (fallback for mfapi)
                    nav_match = re.search(r"Current\s*NAV.*?Rs\.\s*([\d,]+\.\d+)", line, re.IGNORECASE)
                    if nav_match and current_scheme:
                        found_nav = float(nav_match.group(1).replace(",", ""))
                        s_name = current_scheme
                        if s_name not in funds_dict:
                            funds_dict[s_name] = {  # type: ignore
                                "scheme_name": s_name,
                                "amc_name": current_amc,
                                "folio_number": current_folio,
                                "transactions": []
                            }
                        funds_dict[s_name]["latest_pdf_nav"] = found_nav  # type: ignore
                        print(f"DEBUG: Found PDF Native NAV for {s_name}: {found_nav}")

                    # Match transaction rows: Date (DD-MMM-YYYY), Description, Amount, Units, Price/NAV, Balance Units
                    txn_match = re.match(r"^(\d{2}-[A-Za-z]{3}-\d{4})\s+(.+?)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)\s+([\d,]+\.\d+)$", line)
                    if txn_match and current_scheme:
                        date, desc, amt_s, pri_s, uni_s, bal_s = txn_match.groups()
                        
                        amount = float(amt_s.replace(",", ""))
                        price = float(pri_s.replace(",", ""))
                        units = float(uni_s.replace(",", ""))
                        
                        s_name = current_scheme
                        if s_name not in funds_dict:
                            funds_dict[s_name] = {  # type: ignore
                                "scheme_name": s_name,
                                "amc_name": current_amc,
                                "folio_number": current_folio,
                                "transactions": []
                            }
                        
                        # SIP, Purchase buy vs sell
                        txn_type = "purchase"
                        if "redemption" in desc.lower() or "switch out" in desc.lower():
                            txn_type = "redemption"
                            amount = -amount
                            units = -units
                        
                        print(f"DEBUG: Found Txn - Date: {date}, Amt: {amount}, Units: {units} for {s_name}")
                        funds_dict[s_name]["transactions"].append({  # type: ignore
                            "date": date, "type": txn_type, "amount": amount, "nav": price, "units": units
                        })
                        
    except Exception as e:
        warnings.append(f"Error parsing PDF: {str(e)}")
        
    parsed_portfolio = []
    for scheme in funds_dict:
        data = funds_dict[scheme]
        txns = data.get("transactions", [])  # type: ignore
        if not txns:
            continue
            
        units_held = sum(t.get("units", 0) for t in txns)  # type: ignore
        invested_amount = sum(t.get("amount", 0) for t in txns if t.get("amount", 0) > 0)  # type: ignore
        
        purchase_txns = [t for t in txns if t.get("type") == "purchase"]  # type: ignore
        total_p_units = sum(t.get("units", 0) for t in purchase_txns)  # type: ignore
        avg_nav = (invested_amount / total_p_units) if total_p_units > 0 else 0.0
        
        s_code = search_scheme_code(scheme)
        c_nav = None
        if s_code:
            c_nav = fetch_latest_nav(s_code)
        if not c_nav:
            c_nav = data.get("latest_pdf_nav")  # type: ignore
        if not c_nav:
            c_nav = txns[-1].get("nav", 0.0) if txns else 0.0  # type: ignore
            
        current_value = units_held * c_nav
        
        name_l = scheme.lower() if scheme else ""
        plan_type = "direct" if "direct" in name_l else "regular"
        opt_type = "dividend" if "idcw" in name_l else "growth"
        
        parsed_portfolio.append({
            "scheme_name": scheme,
            "amc_name": data.get("amc_name", "UNKNOWN"),  # type: ignore
            "folio_number": data.get("folio_number", "UNKNOWN"),  # type: ignore
            "isin": None,
            "plan_type": plan_type,
            "option_type": opt_type,
            "units_held": units_held,
            "average_nav_purchase": avg_nav,
            "invested_amount": invested_amount,
            "current_nav": c_nav,
            "current_value": current_value,
            "transactions": txns
        })
        
    return parsed_portfolio, warnings
