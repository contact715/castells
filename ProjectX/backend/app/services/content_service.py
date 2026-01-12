import random

def generate_social_post(topic: str, platform: str):
    """
    Mock Service: Content Generation (Claude + DALL-E)
    """
    
    # Mock AI Text Generation
    templates = [
        f"Thinking about {topic}? We've got you covered! contact us today for the best service in town. #{topic.replace(' ', '')} #HomeServices",
        f"Don't let {topic} stress you out. Our expert team is here to help! 🛠️✨",
        f"Special Offer: 20% off on all {topic} services this week! Book now before slots fill up.",
        f"Expert Tip: Regular {topic} maintenance can save you thousands in the long run. Swipe to learn more!"
    ]
    
    generated_text = random.choice(templates)
    
    # Mock AI Image Generation (Placeholder)
    # In a real app, this would call DALL-E 3 and save to S3
    image_keywords = topic.replace(" ", "+")
    image_url = f"https://placehold.co/600x400?text={image_keywords}"
    
    return {
        "text_content": generated_text,
        "image_url": image_url,
        "platform": platform,
        "topic": topic
    }
