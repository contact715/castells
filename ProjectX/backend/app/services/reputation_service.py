def process_new_review(review_data: dict):
    """
    Mock Service: Reputation Management
    Input: { "rating": int, "text": str, "platform": str, "author": str }
    """
    rating = review_data.get("rating", 0)
    sentiment = "POSITIVE" if rating >= 4 else "NEGATIVE"
    
    if rating >= 4:
        # Auto-Reply Logic
        reply_text = f"Thank you {review_data.get('author', 'Customer')} for the {rating}-star review! We are thrilled to hear you had a great experience with us."
        action = "AUTO_REPLIED"
        status = "published"
    else:
        # Flagging Logic
        reply_text = "Internal Alert: Low rating detected. Manager review required."
        action = "FLAGGED_FOR_REVIEW"
        status = "pending"
        
    return {
        "sentiment": sentiment,
        "action_taken": action,
        "reply_text": reply_text,
        "status": status
    }
