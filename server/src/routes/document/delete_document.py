from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.schemas import DocumentGetResponse
from src.services.documents import service_delete_document
from src.utils import db_session, needs_auth

delete_document_router = APIRouter()


@delete_document_router.get("/test")
def test_route():
    return {
        "message": "Hello File"
    }

@delete_document_router.delete("/delete/{document_hash}", status_code=200)
def get_document_route(
    document_hash: str,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    return service_delete_document(
        uuid=int(auth.get("sub")),
        document_hash=document_hash,
        db=db
    )
