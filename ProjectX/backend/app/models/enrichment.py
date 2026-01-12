from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, JSON
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base import Base

class PropertyData(Base):
    __tablename__ = "property_data"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), unique=True, nullable=False)
    
    # Property Details (Mashvisor/Estated)
    sqft = Column(Integer)
    lot_size = Column(Float)
    year_built = Column(Integer)
    bedrooms = Column(Integer)
    bathrooms = Column(Float)
    estimated_value = Column(Integer)
    last_sold_date = Column(DateTime)
    last_sold_price = Column(Integer)
    tax_history = Column(JSON) # List of tax assessments
    
    # Social/Identity (Clay/Apollo)
    linkedin_url = Column(String)
    job_title = Column(String)
    company_name = Column(String)
    verified_email = Column(String)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    lead = relationship("Lead", back_populates="property_data")
