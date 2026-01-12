import time

def inject_exif_data(photo_url: str, lat: float, lon: float, keywords: str):
    """
    Mock Service: Simulates downloading a photo, injecting GPS EXIF data and Alt Text,
    and re-uploading it.
    """
    time.sleep(1) # Simulate processing
    
    # In a real app, we'd use 'Pillow' (PIL) or 'piexif' here.
    processed_url = photo_url.replace(".jpg", "_geotagged.jpg")
    
    print(f"[SEO Processor] Injected GPS ({lat}, {lon}) and Keywords '{keywords}' into {photo_url}")
    return processed_url

def sync_to_gmb(photo_url: str, caption: str):
    """
    Mock Service: Posts the geo-tagged photo to Google Business Profile via API.
    """
    time.sleep(1)
    
    # Mock GMB API call
    return {
        "platform": "Google Business Profile",
        "status": "published",
        "post_url": f"https://business.google.com/posts/12345",
        "views_projected": 150
    }
