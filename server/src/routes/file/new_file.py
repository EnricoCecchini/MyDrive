from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.schemas import NewFileRequest
from src.services.file import service_new_document
from src.utils import db_session, needs_auth

files_router = APIRouter(prefix="/files", tags=["Files"])


@files_router.get("/test")
def test_route():
    return {
        "message": "Hello File"
    }

@files_router.post("/new")
def new_file_route(
    file: NewFileRequest,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    return service_new_document(
        uuid=int(auth.get("sub")),
        folder_id=file.folder_id,
        type_id=file.type,
        db=db,
        name=file.name
    )
