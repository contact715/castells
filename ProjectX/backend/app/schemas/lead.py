from pydantic import BaseModel, EmailStr
from typing import Optional, Any

class LeadBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    address: str
    zip_code: str
    city: Optional[str] = None
    state: Optional[str] = None
    organization_id: int = 1 # Default to 1 for now

class LeadCreate(LeadBase):
    pass

class LeadResponse(LeadBase):
    id: int
    status: str
    lead_score: Optional[int] = 0
    
    class Config:
        from_attributes = True

class OTPVerify(BaseModel):
    lead_id: int
    otp_code: str
