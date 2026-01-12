from app.api.v1.endpoints import leads, marketing, analytics, compliance, auth, vision, agent, settings

api_router = APIRouter()
api_router.include_router(leads.router, prefix="/leads", tags=["leads"])
api_router.include_router(marketing.router, prefix="/marketing", tags=["marketing"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
api_router.include_router(compliance.router, prefix="/compliance", tags=["compliance"])
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(vision.router, prefix="/vision", tags=["vision"])
api_router.include_router(agent.router, prefix="/agent", tags=["agent"])
api_router.include_router(settings.router, prefix="/settings", tags=["settings"])
