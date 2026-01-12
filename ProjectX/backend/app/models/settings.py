from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class ClientSettings(Base):
    __tablename__ = "client_settings"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), unique=True, nullable=False)
    
    # 1. AI Personality & Knowledge Base
    business_bio = Column(Text, default="We are a premier HVAC company serving the greater metro area since 1995.")
    voice_clone_id = Column(String, default="default_voice_v1")
    
    # 2. Operational Config
    active_zip_codes = Column(JSON, default=["90210", "90001"])
    min_lead_score = Column(Integer, default=50)
    target_roas = Column(Float, default=3.5)
    
    # 3. Alert Matrix
    # Structure: {"sms": ["new_lead", "emergency"], "email": ["summary"], "telegram": ["hot_lead"]}
    alert_settings = Column(JSON, default={
        "sms_on_new_lead": True,
        "email_daily_summary": True,
        "telegram_hot_alerts": False
    })
    
    # 4. Scoring Logic Weights
    # Structure: {"property_value": 0.5, "social": 0.3, "urgency": 0.2}
    lead_score_weights = Column(JSON, default={
        "property_value": 0.6,
        "social_presence": 0.3,
        "urgency": 0.1
    })
    
    organization = relationship("Organization")
