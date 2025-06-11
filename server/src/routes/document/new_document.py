from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.schemas import DocumentNewRequest
from src.services.documents import service_new_document
from src.utils import db_session, needs_auth, get_root_folder_hash

new_document_router = APIRouter()


@new_document_router.get("/test")
def test_route():
    return {
        "message": "Hello Doc"
    }

@new_document_router.post("/new")
def new_document_route(
    document: DocumentNewRequest,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    uuid=int(auth.get("sub"))

    if document.folder_hash == "root":
        document.folder_hash = get_root_folder_hash(db=db, uuid=uuid)

    return service_new_document(
        uuid=uuid,
        folder_hash=document.folder_hash,
        type_id=document.type,
        db=db,
        name=document.name
    )
