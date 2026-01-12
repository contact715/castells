from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.models.lead import Lead
from app.schemas.lead import LeadCreate, LeadResponse, OTPVerify

router = APIRouter()

@router.post("/ingest", response_model=LeadResponse)
def ingest_lead(lead_in: LeadCreate, db: Session = Depends(get_db)):
    """
    Ingest a new lead.
    1. Normalize data (TODO)
    2. Check Geo-Fencing (Mock: All ZIPs valid)
    3. Create Lead in DB (Pending)
    4. Trigger SMS OTP (Mock: Always sends '123456')
    """
    
    # Mock Geo-Fencing
    # if lead_in.zip_code not in SERVICE_AREAS: ...

    new_lead = Lead(
        organization_id=lead_in.organization_id,
        first_name=lead_in.first_name,
        last_name=lead_in.last_name,
        email=lead_in.email,
        phone=lead_in.phone,
        address=lead_in.address,
        zip_code=lead_in.zip_code,
        city=lead_in.city,
        state=lead_in.state,
        status="pending",
        source="web_form"
    )
    
    db.add(new_lead)
    db.commit()
    db.refresh(new_lead)
    
    # Trigger Mock OTP (Log to console)
    print(f"DTO: Sending OTP to {new_lead.phone}: 123456")
    
    return new_lead

from app.worker import process_lead_enrichment

@router.post("/verify", response_model=LeadResponse)
def verify_lead(otp_in: OTPVerify, db: Session = Depends(get_db)):
    """
    Verify a lead using OTP.
    Mock Logic: Code must be '123456'.
    """
    lead = db.query(Lead).filter(Lead.id == otp_in.lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
        
    if otp_in.otp_code != "123456":
        raise HTTPException(status_code=400, detail="Invalid OTP code")
        
    lead.status = "verified"
    db.commit()
    db.refresh(lead)
    
    # Trigger Async Enrichment
    process_lead_enrichment.delay(lead.id)
    
    return lead
