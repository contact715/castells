def calculate_lead_score(lead_data: dict, enrichment_data: dict = {}):
    """
    Mock Service: Uses Claude 4.5 Sonnet (simulated) to score leads.
    Inputs: Enriched lead data.
    Outputs: Score (0-100), Priority Tag, Dossier Summary.
    """
    # Weightage Logic for Mocking
    base_score = 50
    
    # 1. Property Value (40%)
    prop_val = lead_data.get("property_value", 0)
    if prop_val > 1000000:
        base_score += 25
    elif prop_val > 500000:
        base_score += 15
        
    # 2. Income (30%)
    income = lead_data.get("household_income", 0)
    if income > 150000:
        base_score += 20
    elif income > 80000:
        base_score += 10
        
    # 3. Social Intent (10%)
    social_score = lead_data.get("social_quality_score", 0)
    if social_score > 80:
        base_score += 10
        
    # Cap 100
    final_score = min(base_score, 100)
    
    # Priority
    priority = "LOW"
    if final_score > 80:
        priority = "HOT_LEAD"
    elif final_score > 60:
        priority = "WARM"
        
    # Dossier Generation (Mock Claude Output)
    dossier = f"""
    AI ANALYSIS:
    - High-value property detected (${prop_val/1000}k).
    - Verified income bracket: Top 15%.
    - Social footprint suggests {lead_data.get('job_title')} with liquid capital.
    - RECOMMENDED ACTION: Immediate Call.
    """
    
    return {
        "score": final_score,
        "priority_tag": priority,
        "dossier": dossier.strip()
    }
