from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy.orm import Session
from src.schemas import NewFolderRequest
from src.services import service_new_folder
from src.utils import db_session, needs_auth, get_root_folder_hash, get_folder

file_upload_router = APIRouter()


@file_upload_router.post("/upload_file/folder/{folder_hash}")
def post_upload_file_route(
    file: UploadFile,
    folder_hash: str | None = None,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    uuid=int(auth.get("sub"))
    print(file)

    if folder_hash == "root":
        folder_hash = get_root_folder_hash(db=db, uuid=uuid)

    # # Get parent folder ID
    # parent_folder = get_folder(db=db, uuid=uuid, folder_hash=folder_hash.parent_hash)
    # return service_new_folder(
    #     uuid=uuid,
    #     db=db,
    #     parent_id=parent_folder.id,
    #     name=folder_hash.name,
    #     description=None,
    #     path=parent_folder.path
    # )
