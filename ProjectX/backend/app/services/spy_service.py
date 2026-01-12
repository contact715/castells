import random
import time
from datetime import datetime

def scrape_neighborhood_opportunities(zip_code: str):
    """
    Mock Service: Simulates scraping Nextdoor/Facebook Groups for keywords 
    like "plumber needed", "roof leak", "AC broken".
    """
    time.sleep(2) # Simulate browser automation latency
    
    platforms = ["Nextdoor", "Facebook Community Group", "Reddit (r/homeowners)"]
    keywords = ["AC not cooling", "Need a plumber ASAP", "Water heater leaking", "Furnace inspection"]
    
    opportunities = []
    
    # Generate 1-3 random opportunities
    count = random.randint(1, 3)
    for _ in range(count):
        keyword = random.choice(keywords)
        platform = random.choice(platforms)
        user_name = f"Neighbor_{random.randint(100, 999)}"
        
        # Mock AI Response Generation
        ai_response = f"Hi {user_name}! We're a top-rated local shop in {zip_code}. {keyword} sounds tricky - we can have a tech there by 2pm. DM me for a free estimate!"
        
        opportunities.append({
            "id": f"opp_{random.randint(1000, 9999)}",
            "platform": platform,
            "post_content": f"Anyone know a good tech? {keyword}. It's getting hot in here!",
            "author": user_name,
            "detected_at": datetime.now().isoformat(),
            "suggested_response": ai_response,
            "sentiment": "Urgent"
        })
        
    return opportunities
