import random
import time

def enrich_lead_data(email: str, phone: str = None, address: str = None):
    """
    Mock Service: Simulates 'Deep Recon' by fetching data from Mashvisor (Property), 
    Clay (Social), and others.
    """
    time.sleep(2) # Simulate API latency
    
    # 1. Property Data (Mock Mashvisor)
    property_data = {
        "sqft": random.randint(1500, 3500),
        "lot_size": round(random.uniform(0.1, 0.5), 2),
        "year_built": random.randint(1980, 2020),
        "bedrooms": random.randint(2, 5),
        "bathrooms": random.randint(2, 4),
        "estimated_value": random.randint(400000, 1500000),
        "last_sold_price": random.randint(300000, 900000),
        "last_sold_date": "2019-05-15T00:00:00",
        "tax_history": [
            {"year": 2023, "tax": 8500},
            {"year": 2022, "tax": 8200}
        ]
    }
    
    # 2. Social Data (Mock Clay/Apollo)
    social_data = {
        "linkedin_url": f"https://linkedin.com/in/{email.split('@')[0]}",
        "job_title": random.choice(["VP of Engineering", "Senior Marketing Manager", "Small Business Owner", "Surgeon"]),
        "company_name": random.choice(["Tech Corp", "Local Hospital", "Real Estate Ventures", "Global Inc"]),
        "verified_email": email
    }
    
    # 3. Generate Sales Cheat Sheet (Heuristic Rule-Based for Mock)
    cheat_sheet = []
    if property_data["year_built"] < 2000:
        cheat_sheet.append("⚠️ Home built before 2000: HVAC likely nearing end of life.")
    if property_data["estimated_value"] > 800000:
        cheat_sheet.append("💰 High-Value Property: Pitch premium 'Inverter' systems.")
    if "Owner" in social_data["job_title"] or "VP" in social_data["job_title"]:
        cheat_sheet.append("👔 Decision Maker: Likely values time and efficiency over lowest price.")
        
    return {
        "social_profile_url": "https://linkedin.com/in/example-profile"
    }
