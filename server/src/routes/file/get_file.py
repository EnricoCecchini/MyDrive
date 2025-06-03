from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.schemas import NewFileRequest, FileGetResponse
from src.services.file import service_get_document
from src.utils import db_session, needs_auth

get_file_router = APIRouter()


@get_file_router.get("/test")
def test_route():
    return {
        "message": "Hello File"
    }

@get_file_router.get("/file/{fileID}", response_model=FileGetResponse, status_code=200)
def get_file_route(
    fileID: int,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    return service_get_document(
        uuid=int(auth.get("sub")),
        file_id=fileID,
        db=db
    )
