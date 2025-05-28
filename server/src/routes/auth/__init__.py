from fastapi import APIRouter

from .register import register_router

auth_router = APIRouter(prefix="/auth", tags=["AUTH"])
auth_router.include_router(register_router)