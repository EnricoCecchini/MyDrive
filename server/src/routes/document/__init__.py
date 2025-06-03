from fastapi import APIRouter

from .new_document import new_document_router
from .get_document import get_document_router

documents_router = APIRouter(prefix="/documents", tags=["Documents"])
documents_router.include_router(new_document_router)
documents_router.include_router(get_document_router)