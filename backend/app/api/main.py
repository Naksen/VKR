from fastapi import APIRouter

from app.api.routes import items, login, users, utils, laundry, issue, public_area

api_router = APIRouter()
api_router.include_router(login.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
api_router.include_router(items.router, prefix="/items", tags=["items"])
api_router.include_router(laundry.router, prefix="/laundries", tags=["laundries"])
api_router.include_router(issue.router, prefix="/issues", tags=["issues"])
api_router.include_router(public_area.router, prefix="/public_area", tags=["public_area"])