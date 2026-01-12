from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.services.analytics_service import get_dashboard_stats
from app.services.transcription_service import transcribe_call
from typing import List, Any
from pydantic import BaseModel

router = APIRouter()

# Simple schema for stats response
class StatsResponse(BaseModel):
    revenue: int
    total_leads: int
    qualified_leads: int
    conversion_rate: float
    pipeline_value: int
    recent_leads: List[Any] # Using Any for simplicity with ORM objects in this demo

    class Config:
        from_attributes = True

from app.api import deps
from app.models.user import User

@router.get("/stats", response_model=StatsResponse)
def get_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(deps.get_current_user)
):
    """
    Get aggregated dashboard statistics.
    """
    return get_dashboard_stats(db)

@router.get("/calls/{call_id}/transcript")
def get_call_transcript(call_id: str):
    """
    Get AI transcription for a specific call.
    """
    return transcribe_call(call_id)
