from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Pipeline(Base):
    __tablename__ = "pipelines"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"), nullable=False)
    name = Column(String, index=True)
    is_default = Column(Boolean, default=False)

    stages = relationship("PipelineStage", back_populates="pipeline", order_by="PipelineStage.order")
    organization = relationship("Organization")

class PipelineStage(Base):
    __tablename__ = "pipeline_stages"

    id = Column(Integer, primary_key=True, index=True)
    pipeline_id = Column(Integer, ForeignKey("pipelines.id"), nullable=False)
    name = Column(String)
    color = Column(String, default="#CCCCCC")
    order = Column(Integer, default=0)
    is_system_stage = Column(Boolean, default=False) # e.g. "Unsorted", "Won", "Lost"

    pipeline = relationship("Pipeline", back_populates="stages")
