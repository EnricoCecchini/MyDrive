from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.schemas import DocumentUpdateContentRequest, DocumentUpdateNameRequest
from src.services.documents import service_update_document, service_update_document_title
from src.utils import db_session, needs_auth

update_document_router = APIRouter()


@update_document_router.get("/test")
def test_route():
    return {
        "message": "Hello File"
    }

@update_document_router.put("/update/{document_hash}", status_code=200)
def update_document_content_route(
    document_hash: str,
    data: DocumentUpdateContentRequest,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    return service_update_document(
        uuid=int(auth.get("sub")),
        document_hash=document_hash,
        content=data.content,
        db=db
    )

@update_document_router.put("/rename/{document_hash}", status_code=200)
def update_document_rename_route(
    document_hash: str,
    data: DocumentUpdateNameRequest,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    return service_update_document_title(
        uuid=int(auth.get("sub")),
        document_hash=document_hash,
        name=data.name,
        db=db
    )
