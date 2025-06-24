from fastapi import APIRouter

from .upload_file import file_upload_router

file_router = APIRouter(prefix="/files", tags=["Files"])
file_router.include_router(file_upload_router)
