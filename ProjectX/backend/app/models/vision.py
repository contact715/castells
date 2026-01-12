from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base

class VisionScan(Base):
    __tablename__ = "vision_scans"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False)
    
    image_url = Column(String, nullable=False)
    analyzed_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # AI Analysis (Gemini 3.0 Pro Vision)
    detected_equipment = Column(String) # e.g. "Trane XR14 AC Unit"
    damage_assessment = Column(Text) # "Rusted coils visible, signs of leakage"
    rough_estimate_min = Column(Integer)
    rough_estimate_max = Column(Integer)
    
    raw_analysis_json = Column(JSON) # Full AI response
    
    lead = relationship("Lead", back_populates="vision_scans")
