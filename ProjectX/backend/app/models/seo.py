from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, JSON, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base

class SEOJob(Base):
    __tablename__ = "seo_jobs"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False)
    
    # Original Photo
    original_photo_url = Column(String, nullable=False)
    
    # Metadata Injection
    target_keywords = Column(String) # "AC Repair [City] [Zip]"
    gps_latitude = Column(Float)
    gps_longitude = Column(Float)
    
    # Publishing Status
    processed_photo_url = Column(String)
    posted_to_gmb = Column(Boolean, default=False)
    posted_to_yelp = Column(Boolean, default=False)
    gmb_post_url = Column(String)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    lead = relationship("Lead", back_populates="seo_jobs")
