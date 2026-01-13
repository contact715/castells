from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.db.base import Base
# Import Pipeline for string reference in relationship if needed, 
# but usually string is fine. Keeping imports minimal.

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    
    # Pipeline Info
    pipeline_id = Column(Integer, ForeignKey("pipelines.id"), nullable=True)
    stage_id = Column(Integer, ForeignKey("pipeline_stages.id"), nullable=True)
    
    # Contact Info
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    email = Column(String, index=True, nullable=True)
    phone = Column(String, index=True, nullable=True)
    
    # Location
    address = Column(String, nullable=True)
    city = Column(String, nullable=True)
    state = Column(String, nullable=True)
    zip_code = Column(String, index=True, nullable=True)
    
    # Status & Score
    status = Column(String, default="pending", index=True) # pending, verified, enriched, contacted, closed
    lead_score = Column(Integer, default=0)
    
    # Enrichment Data
    property_value = Column(Float, nullable=True)
    household_income = Column(Float, nullable=True)
    social_profile_url = Column(String, nullable=True)
    
    # Meta
    source = Column(String, nullable=True) # web, facebook, yelp
    meta_data = Column(JSON, default={}) # Store raw JSON from varying sources
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    organization = relationship("Organization")
    
    # Phase 3 Relationships
    vision_scans = relationship("VisionScan", back_populates="lead")
    seo_jobs = relationship("SEOJob", back_populates="lead")
    
    # Pipeline Relationships
    pipeline = relationship("Pipeline")
    stage = relationship("PipelineStage")
