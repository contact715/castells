from app.core.celery_app import celery_app
from app.db.base import SessionLocal
from app.models.lead import Lead
from app.services.enrichment_service import enrich_lead_data
from app.services.scoring_service import calculate_lead_score
from app.services.telephony_service import initiate_manager_call
import json

@celery_app.task
def process_lead_enrichment(lead_id: int):
    """
    Async Task:
    1. Fetch Lead
    2. Enrich Data (Mashvisor/Clay)
    3. Calculate AI Score (Claude 4.5)
    4. Update DB
    5. Trigger Call if Hot Lead
    """
    db = SessionLocal()
    try:
        lead = db.query(Lead).filter(Lead.id == lead_id).first()
        if not lead:
            print(f"Lead {lead_id} not found.")
            return

        print(f"Starting enrichment for Lead {lead_id}...")
        
        # 1. Enrichment (Deep Recon)
        enrichment_data = enrich_lead_data(lead.email, lead.phone, lead.address)
        
        # Save Property Data
        prop_data = enrichment_data["property_data"]
        soc_data = enrichment_data["social_data"]
        
        # Ideally, we update a PropertyData model here. For the mock/MVP speed, 
        # we might just dump important bits into meta_data or simple fields on Lead,
        # BUT since we created the PropertyData model, let's try to populate it if we can access the DB session properly.
        # NOTE: Celery worker DB session management is tricky. For this specific 'worker.py' standalone, 
        # we are re-creating a session.
        
        from app.models.enrichment import PropertyData
        
        property_record = PropertyData(
            lead_id=lead.id,
            sqft=prop_data["sqft"],
            lot_size=prop_data["lot_size"],
            year_built=prop_data["year_built"],
            estimated_value=prop_data["estimated_value"],
            linkedin_url=soc_data["linkedin_url"],
            job_title=soc_data["job_title"],
            company_name=soc_data["company_name"]
        )
        db.add(property_record)
        
        # Update Lead Metadata with Cheat Sheet
        current_meta = lead.meta_data or {}
        current_meta["sales_cheat_sheet"] = enrichment_data["sales_cheat_sheet"]
        lead.meta_data = current_meta
        
        # 2. AI Scoring
        # Combine base lead data + enriched data for scoring
        scoring_input = {
            "property_value": lead.property_value,
            "household_income": lead.household_income,
            "social_quality_score": enrichment_data.get("social_quality_score"),
            "job_title": enrichment_data.get("job_title")
        }
        
        score_result = calculate_lead_score(scoring_input)
        
        lead.lead_score = score_result["score"]
        
        # Update metadata with dossier
        lead.meta_data["ai_dossier"] = score_result["dossier"]
        lead.meta_data["priority_tag"] = score_result["priority_tag"]
        
        # Final Status Update
        lead.status = "enriched"
        
        # 3. Speed-to-Lead Trigger
        if score_result["priority_tag"] == "HOT_LEAD":
            print(f"HOT LEAD DETECTED ({lead.lead_score})! Initiating Speed-to-Lead protocol...")
            lead_dict = {
                "first_name": lead.first_name,
                "last_name": lead.last_name,
                "phone": lead.phone,
                "zip_code": lead.zip_code
            }
            call_result = initiate_manager_call(lead_dict, lead.lead_score)
            
            lead.status = "contacted"
            lead.meta_data["last_call_sid"] = call_result["call_sid"]
            print(f"Call Completed. Recording: {call_result['recording_url']}")
        
        db.commit()
        print(f"Lead {lead_id} fully processed. Final Status: {lead.status}")
        
    except Exception as e:
        print(f"Error processing lead {lead_id}: {e}")
        db.rollback()
    finally:
        db.close()
