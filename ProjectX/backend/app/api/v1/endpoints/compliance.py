from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.services.compliance_service import check_dnc, anonymize_lead
from pydantic import BaseModel

router = APIRouter()

class DNCRequest(BaseModel):
    phone: str

class DNCResponse(BaseModel):
    phone: str
    is_safe_to_call: bool
    status: str

@router.post("/dnc-check", response_model=DNCResponse)
def check_number(request: DNCRequest):
    """
    Check if a number is on the Do Not Call registry.
    """
    is_safe = check_dnc(request.phone)
    status = "SAFE" if is_safe else "DNC_LISTED"
    
    return {
        "phone": request.phone,
        "is_safe_to_call": is_safe,
        "status": status
    }

@router.post("/data-privacy/forget/{lead_id}")
def forget_lead(lead_id: int, db: Session = Depends(get_db)):
    """
    Execute 'Right to be Forgotten' request for a lead.
    """
    lead = anonymize_lead(db, lead_id)
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
        
    return {"status": "success", "message": f"Lead {lead_id} has been anonymized."}
