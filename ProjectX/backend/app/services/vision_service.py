import time
import random

def analyze_image(image_url: str):
    """
    Mock Service: Simulates Gemini 3.0 Pro Vision analysis on an uploaded image.
    Identifies HVAC equipment, detects damage, and estimates repair/replacement costs.
    """
    time.sleep(3) # Simulate heavy AI processing
    
    # Mock Detection Logic
    equipment_brands = ["Trane XR14", "Carrier Infinity", "Lennox Elite", "Rheem Classic"]
    issues = [
        "Visible rust on condenser coils",
        "Fan blade appears bent or misaligned",
        "Debris blockage in intake vents",
        "Insulation damage on coolant lines"
    ]
    
    detected_brand = random.choice(equipment_brands)
    detected_issue = random.choice(issues)
    
    # Estimate calculation
    min_cost = random.randint(200, 500)
    max_cost = min_cost + random.randint(100, 300)
    
    return {
        "detected_equipment": detected_brand,
        "damage_assessment": detected_issue,
        "rough_estimate_min": min_cost,
        "rough_estimate_max": max_cost,
        "confidence_score": round(random.uniform(0.85, 0.99), 2),
        "recommendation": f"Technician inspection recommended for {detected_brand}. Possible {detected_issue.lower()}."
    }
