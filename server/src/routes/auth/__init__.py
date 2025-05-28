from fastapi import APIRouter

from .login import login_router
from .register import register_router

auth_router = APIRouter(prefix="/auth", tags=["AUTH"])
auth_router.include_router(register_router)
auth_router.include_router(login_router)