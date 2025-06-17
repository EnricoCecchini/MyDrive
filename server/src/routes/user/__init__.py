from fastapi import APIRouter

from .users import user_router
from .dashboard import dashboard_router

users_router = APIRouter(prefix="/users", tags=["Users"])

users_router.include_router(user_router)
users_router.include_router(dashboard_router)
