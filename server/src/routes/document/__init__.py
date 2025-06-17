from fastapi import APIRouter

from .delete_document import delete_document_router
from .get_document import get_document_router
from .new_document import new_document_router
from .update_document import update_document_router

documents_router = APIRouter(prefix="/documents", tags=["Documents"])
documents_router.include_router(new_document_router)
documents_router.include_router(get_document_router)
documents_router.include_router(update_document_router)
documents_router.include_router(delete_document_router)