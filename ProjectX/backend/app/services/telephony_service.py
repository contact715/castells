import uuid
import time

from app.services.compliance_service import check_dnc

def initiate_manager_call(lead_data: dict, lead_score: int):
    """
    Mock Service: Simulates Retell AI + Twilio flow.
    """
    print(f"--- TELEPHONY SERVICE STARTED ---")
    lead_name = f"{lead_data.get('first_name')} {lead_data.get('last_name')}"
    lead_phone = lead_data.get('phone')
    
    # 0. Compliance Check
    if not check_dnc(lead_phone):
        print(f"[Compliance] BLOCKED: {lead_phone} is on DNC list.")
        return {
            "call_sid": None,
            "status": "blocked_dnc",
            "recording_url": None
        }
    
    # 1. Retell AI: Generate Voice Prompt
    print(f"[Retell AI] Generating IVR Audio for {lead_name} (Score: {lead_score})...")
    tos_script = f"Hot Lead Alert! {lead_name} from {lead_data.get('zip_code')}. Score {lead_score}. Press 1 to connect."
    print(f"[Retell AI] Audio Generated: '{tos_script}'")
    
    # 2. Twilio: Dial Manager using Retell Agent
    call_sid = str(uuid.uuid4())
    print(f"[Twilio] Dialing Sales Manager (555-0199)...")
    # time.sleep(1) # Simulate Ringing
    print(f"[Twilio] Manager Answered.")
    print(f"[Twilio] Playing Stream: {call_sid}")
    
    # 3. Bridging
    print(f"[Twilio] DTMF '1' Detectected. Bridging to Customer {lead_phone}...")
    
    return {
        "call_sid": call_sid,
        "status": "completed",
        "recording_url": f"https://api.twilio.com/recordings/{call_sid}.mp3"
    }
