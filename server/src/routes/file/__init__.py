from fastapi import APIRouter

from .new_file import new_file_router
from .get_file import get_file_router

files_router = APIRouter(prefix="/files", tags=["Files"])
files_router.include_router(new_file_router)
files_router.include_router(get_file_router)