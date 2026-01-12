from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.api import deps
from app.models.user import User
from app.services.spy_service import scrape_neighborhood_opportunities
from app.services.agent_service import trigger_nurture_cycle

router = APIRouter()

# --- AI Spy Endpoints ---

class Opportunity(BaseModel):
    id: str
    platform: str
    post_content: str
    author: str
    detected_at: str
    suggested_response: str
    sentiment: str

@router.get("/spy/opportunities", response_model=List[Opportunity])
def get_neighborhood_opportunities(
    zip_code: str = "90210",
    current_user: User = Depends(deps.get_current_user)
):
    """
    Scrapes local social platforms for leads in a given ZIP code.
    """
    return scrape_neighborhood_opportunities(zip_code)


# --- Agentic Follow-up Endpoints ---

class AgentAction(BaseModel):
    action: str
    channel: str
    content: str
    reasoning: str

@router.post("/agent/nurture/{lead_id}", response_model=AgentAction)
def start_nurture_agent(
    lead_id: int,
    current_user: User = Depends(deps.get_current_user)
):
    """
    Trigger the LangGraph autonomous agent to start nurturing a lead.
    """
    # In a real app, we'd check if Lead exists
    return trigger_nurture_cycle(lead_id)
