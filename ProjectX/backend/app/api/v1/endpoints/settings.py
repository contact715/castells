from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.base import get_db
from app.api import deps
from app.models.user import User
# from app.models.settings import ClientSettings # Need to make sure this is imported in base or here

router = APIRouter()

# Schema for Requests
class SettingsUpdate(BaseModel):
    business_bio: str = None
    voice_clone_id: str = None
    min_lead_score: int = None
    active_zip_codes: List[str] = None
    alert_settings: dict = None
    lead_score_weights: dict = None

class ChatTestRequest(BaseModel):
    message: str
    business_bio: str  # We pass it explicitly or fetch from DB in real implementation

@router.get("/", response_model=dict)
def get_settings(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Get client settings. (Mocked for speed if DB table isn't fully migrated in session)
    """
    # In a real app:
    # settings = db.query(ClientSettings).filter(ClientSettings.organization_id == current_user.organization_id).first()
    # return settings
    
    return {
        "business_bio": "We are top-rated AC repair experts in Miami.",
        "active_zip_codes": ["33101", "33139", "33140"],
        "min_lead_score": 60,
        "alert_settings": {
            "sms_on_new_lead": True,
            "email_daily_summary": True
        },
        "lead_score_weights": {
            "property_value": 50,
            "social_presence": 30,
            "urgency": 20
        }
    }

@router.put("/", response_model=dict)
def update_settings(
    settings_in: SettingsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    Update client settings. API Stub.
    """
    return {
        "status": "success",
        "updated": settings_in.dict(exclude_unset=True)
    }

@router.post("/chat-test")
def test_ai_response(
    request: ChatTestRequest,
    current_user: User = Depends(deps.get_current_user),
) -> Any:
    """
    AI Playground: Simulates RAG response using the Business Bio.
    """
    import time
    time.sleep(1) # Simulate think time
    
    user_q = request.message.lower()
    bio = request.business_bio.lower()
    
    # Mock RAG Logic
    answer = ""
    if "hour" in user_q or "open" in user_q:
        answer = "Based on your business bio settings, I would say: 'We are open 24/7 for emergency repairs and 8am-6pm for standard maintenance.'"
    elif "price" in user_q or "cost" in user_q:
        answer = "I would respond: 'Our service call fee is $89, which is waived if you proceed with the recommended repair.'"
    else:
        answer = f"I would generate a response aligning with this persona: '{request.business_bio[:50]}...'"
        
    return {
        "response": answer,
        "used_context": request.business_bio
    }
