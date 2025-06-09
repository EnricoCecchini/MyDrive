from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.schemas import DocumentUpdateContentRequest
from src.services.documents import service_update_document
from src.utils import db_session, needs_auth

update_document_router = APIRouter()


@update_document_router.get("/test")
def test_route():
    return {
        "message": "Hello File"
    }

@update_document_router.put("/update/{document_hash}", status_code=200)
def update_document_route(
    document_hash: str,
    data: DocumentUpdateContentRequest,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    return service_update_document(
        uuid=int(auth.get("sub")),
        document_id=document_hash,
        content=data.content,
        db=db
    )
