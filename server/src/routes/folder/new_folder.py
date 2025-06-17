from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.schemas import NewFolderRequest
from src.services import service_new_folder
from src.utils import db_session, needs_auth, get_root_folder_hash, get_folder

new_folder_router = APIRouter()


@new_folder_router.get("/test")
def test_route():
    return {
        "message": "Hello Doc"
    }

@new_folder_router.post("/new")
def new_folder_route(
    folder: NewFolderRequest,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    uuid=int(auth.get("sub"))

    if folder.parent_hash == "root":
        folder.parent_hash = get_root_folder_hash(db=db, uuid=uuid)

    # Get parent folder ID
    parent_folder = get_folder(db=db, uuid=uuid, folder_hash=folder.parent_hash)
    return service_new_folder(
        uuid=uuid,
        db=db,
        parent_id=parent_folder.id,
        name=folder.name,
        description=None,
        path=parent_folder.path
    )
