from typing import List, Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from src.schemas import UserProfileResponse, UserUpdatePasswordRequest
from src.services.folder import service_get_folder_content, service_new_folder
from src.services.user import service_dashboard_search
from src.utils import db_session, get_root_folder_hash, needs_auth

dashboard_router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@dashboard_router.get("/folder/{folder_hash}", status_code=200)
def route_dashboard_dashboard(folder_hash: str | None = None, auth: dict = Depends(needs_auth), db: Session = Depends(db_session.get_session)):
    uuid=int(auth.get("sub"))

    if folder_hash == "root":
        folder_hash = get_root_folder_hash(db=db, uuid=uuid)

    print("Hash", folder_hash)
    return service_get_folder_content(
        uuid=uuid,
        db=db,
        folder_hash=folder_hash
    )

@dashboard_router.get("/search", status_code=200)
def route_dashboard_search(
    text: Optional[str] = None,
    tags: Optional[List[str]] = Query(default=None),
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    return service_dashboard_search(
        uuid=int(auth.get("sub")),
        text=text,
        tags=tags,
        db=db
    )