from sqlalchemy.orm import Session
from app.models.lead import Lead

def check_dnc(phone: str) -> bool:
    """
    Mock Service: Checks against National DNC Registry & State Lists.
    Returns True if number is SAFE to call.
    Returns False if number is on DNC list as unsafe.
    """
    # Mock Logic: Determine based on prefix
    if phone.startswith("999") or phone.endswith("0000"):
        return False # Mock DNC Hit
        
    return True

def anonymize_lead(db: Session, lead_id: int):
    """
    GDPR/CCPA "Right to be Forgotten".
    Anonymizes PII but keeps non-identifiable stats.
    """
    lead = db.query(Lead).filter(Lead.id == lead_id).first()
    if not lead:
        return None
        
    # Anonymize PII
    lead.first_name = "REDACTED"
    lead.last_name = "REDACTED"
    lead.email = f"redacted_{lead.id}@example.com"
    lead.phone = "000-000-0000"
    lead.address = "REDACTED"
    
    # Metadata cleanup
    lead.meta_data = {"status": "anonymized_per_request"}
    
    db.commit()
    return lead
