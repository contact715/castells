from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.services.reputation_service import process_new_review
from app.services.content_service import generate_social_post

router = APIRouter()

# Schemas (Inline for simplicity given scope, can move to app/schemas later)
class ContentRequest(BaseModel):
    topic: str
    platform: str

class ContentResponse(BaseModel):
    text_content: str
    image_url: str
    platform: str
    topic: str

class ReviewWebhook(BaseModel):
    rating: int
    text: str
    platform: str = "Google"
    author: Optional[str] = "Anonymous"

class ReviewResponse(BaseModel):
    sentiment: str
    action_taken: str
    reply_text: str
    status: str

@router.post("/content/generate", response_model=ContentResponse)
def generate_content(request: ContentRequest):
    """
    Generate social media content using AI (Mock).
    """
    return generate_social_post(request.topic, request.platform)

@router.post("/reputation/webhook", response_model=ReviewResponse)
def reputation_webhook(review: ReviewWebhook):
    """
    Webhook listener for new reviews.
    Auto-replies to positive reviews, flags negative ones.
    """
    return process_new_review(review.model_dump())

# --- Local SEO Endpoints ---
from app.services.seo_service import inject_exif_data, sync_to_gmb
from app.models.lead import Lead
from app.db.base import get_db
from sqlalchemy.orm import Session
from fastapi import Depends

class SEOPhotoUpload(BaseModel):
    lead_id: int
    photo_url: str
    keywords: str = "HVAC Repair, AC Installation"
    lat: float
    lon: float

@router.post("/seo/upload-job-photo")
def upload_job_photo(request: SEOPhotoUpload, db: Session = Depends(get_db)):
    """
    Technician uploads a job photo. System auto-injects EXIF data and posts to GMB.
    """
    # 1. Process Photo
    processed_url = inject_exif_data(request.photo_url, request.lat, request.lon, request.keywords)
    
    # 2. Sync to GMB
    gmb_result = sync_to_gmb(processed_url, caption=f"Another great job done! {request.keywords}")
    
    return {
        "status": "success",
        "processed_url": processed_url,
        "gmb_status": gmb_result
    }
