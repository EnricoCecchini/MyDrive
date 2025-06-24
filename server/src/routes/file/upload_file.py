from fastapi import APIRouter, Depends, UploadFile
from sqlalchemy.orm import Session
from src.services import service_file_upload
from src.utils import db_session, needs_auth, get_root_folder_hash

file_upload_router = APIRouter()


@file_upload_router.post("/upload_file/folder/{folder_hash}")
def post_upload_file_route(
    file: UploadFile,
    folder_hash: str | None = None,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    uuid=int(auth.get("sub"))
    print(f"[cyan]Beginning upload for file: {file.filename}[/cyan]")
    print(file)

    if folder_hash == "root":
        folder_hash = get_root_folder_hash(db=db, uuid=uuid)

    return service_file_upload(
        uuid=uuid,
        file=file,
        folder_hash=folder_hash,
        db=db
    )
