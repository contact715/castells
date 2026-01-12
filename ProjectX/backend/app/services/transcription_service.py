def transcribe_call(call_id: str):
    """
    Mock Service: AI Call Transcription & Analysis (Whisper + Claude)
    """
    # In a real app, this would fetch the recording from Twilio/S3
    # and send it to OpenAI Whisper, then to Claude for summarization.
    
    return {
        "transcript": "Agent: Hello, this is Mike from Castells HVAC. How can I help you?\nClient: Hi, I have a leaky AC unit.\nAgent: I can help with that. Are you available tomorrow?\nClient: Yes, morning works.\nAgent: Great, booked for 9 AM.",
        "summary": "Client reported a leaky AC unit. Appointment scheduled for tomorrow (9 AM).",
        "sentiment": "POSITIVE",
        "key_points": ["Leaky AC", "Scheduled 9 AM", "Urgent"]
    }
