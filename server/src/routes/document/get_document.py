from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.schemas import DocumentGetResponse
from src.services.documents import service_get_document
from src.utils import db_session, needs_auth

get_document_router = APIRouter()


@get_document_router.get("/test")
def test_route():
    return {
        "message": "Hello File"
    }

@get_document_router.get("/document/{document_id}", response_model=DocumentGetResponse, status_code=200)
def get_document_route(
    document_id: int,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    return service_get_document(
        uuid=int(auth.get("sub")),
        document_id=document_id,
        db=db
    )
