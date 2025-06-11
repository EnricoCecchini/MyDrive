from fastapi import APIRouter

from .new_folder import new_folder_router

folder_router = APIRouter(prefix="/folders", tags=["Folders"])
folder_router.include_router(new_folder_router)
