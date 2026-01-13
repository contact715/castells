from pydantic import BaseModel
from typing import List, Optional

# --- Stage Schemas ---
class PipelineStageBase(BaseModel):
    name: str
    color: Optional[str] = "#CCCCCC"
    order: int = 0

class PipelineStageCreate(PipelineStageBase):
    pass

class PipelineStageUpdate(PipelineStageBase):
    name: Optional[str] = None
    color: Optional[str] = None
    order: Optional[int] = None

class PipelineStage(PipelineStageBase):
    id: int
    pipeline_id: int
    is_system_stage: bool = False

    class Config:
        from_attributes = True

# --- Pipeline Schemas ---
class PipelineBase(BaseModel):
    name: str
    is_default: bool = False

class PipelineCreate(PipelineBase):
    pass

class PipelineUpdate(PipelineBase):
    name: Optional[str] = None
    is_default: Optional[bool] = None

class Pipeline(PipelineBase):
    id: int
    organization_id: int
    stages: List[PipelineStage] = []

    class Config:
        from_attributes = True
