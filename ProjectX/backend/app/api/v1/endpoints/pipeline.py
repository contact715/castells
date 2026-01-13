from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.base import get_db
from app.models.pipeline import Pipeline, PipelineStage
from app.schemas import pipeline as pipeline_schema
from app.core.security import get_current_user

router = APIRouter()

@router.get("/", response_model=List[pipeline_schema.Pipeline])
def read_pipelines(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: Any = Depends(get_current_user),
):
    """
    Retrieve pipelines for the current user's organization.
    """
    pipelines = db.query(Pipeline).filter(Pipeline.organization_id == current_user.organization_id).offset(skip).limit(limit).all()
    # If no pipelines exist, create a default one
    if not pipelines:
        default_pipeline = Pipeline(name="Sales Pipeline", is_default=True, organization_id=current_user.organization_id)
        db.add(default_pipeline)
        db.commit()
        db.refresh(default_pipeline)
        
        # Create default stages
        default_stages = [
            PipelineStage(pipeline_id=default_pipeline.id, name="Initial Contact", color="bg-blue-500", order=0),
            PipelineStage(pipeline_id=default_pipeline.id, name="Offer Made", color="bg-yellow-500", order=1),
            PipelineStage(pipeline_id=default_pipeline.id, name="Negotiation", color="bg-purple-500", order=2),
            PipelineStage(pipeline_id=default_pipeline.id, name="Closed Won", color="bg-green-500", order=3, is_system_stage=True),
            PipelineStage(pipeline_id=default_pipeline.id, name="Closed Lost", color="bg-red-500", order=4, is_system_stage=True),
        ]
        db.add_all(default_stages)
        db.commit()
        
        pipelines = [default_pipeline]
        
    return pipelines

@router.post("/", response_model=pipeline_schema.Pipeline)
def create_pipeline(
    *,
    db: Session = Depends(get_db),
    pipeline_in: pipeline_schema.PipelineCreate,
    current_user: Any = Depends(get_current_user),
):
    """
    Create new pipeline.
    """
    pipeline = Pipeline(
        name=pipeline_in.name,
        is_default=pipeline_in.is_default,
        organization_id=current_user.organization_id,
    )
    db.add(pipeline)
    db.commit()
    db.refresh(pipeline)
    return pipeline

@router.put("/stages/{stage_id}", response_model=pipeline_schema.PipelineStage)
def update_stage(
    stage_id: int,
    stage_in: pipeline_schema.PipelineStageUpdate,
    db: Session = Depends(get_db),
    current_user: Any = Depends(get_current_user),
):
    """
    Update a pipeline stage.
    """
    stage = db.query(PipelineStage).filter(PipelineStage.id == stage_id).first()
    if not stage:
        raise HTTPException(status_code=404, detail="Stage not found")
    
    # Verify organization ownership via pipeline
    pipeline = db.query(Pipeline).filter(Pipeline.id == stage.pipeline_id).first()
    if pipeline.organization_id != current_user.organization_id:
        raise HTTPException(status_code=400, detail="Not enough permissions")

    if stage_in.name is not None:
        stage.name = stage_in.name
    if stage_in.color is not None:
        stage.color = stage_in.color
    if stage_in.order is not None:
        stage.order = stage_in.order

    db.add(stage)
    db.commit()
    db.refresh(stage)
    return stage
