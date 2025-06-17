from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.schemas import UserProfileResponse, UserUpdatePasswordRequest
from src.services.user import service_update_password, service_user_profile
from src.services.folder import service_new_folder, service_get_folder_content
from src.utils import db_session, needs_auth, get_root_folder_hash

user_router = APIRouter()


@user_router.get("/test")
def test_route():
    return {
        "message": "Hello World"
    }


@user_router.get("/auth_test")
def auth_test_route(auth: dict = Depends(needs_auth), db: Session = Depends(db_session.get_session)):
    service_new_folder(uuid=auth.get("sub"), parent_id=None, name=auth.get("sub"), path=None, db=db)
    return {
        "message": "Hello World"
    }


@user_router.get("/profile", response_model=UserProfileResponse, status_code=200)
def route_profile(auth: dict = Depends(needs_auth), db: Session = Depends(db_session.get_session)):
    return service_user_profile(int(auth.get("sub")), db)


@user_router.put("/update_password", status_code=200)
def route_update_password(
    data: UserUpdatePasswordRequest,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    return service_update_password(int(auth.get("sub")), data.password, data.password_confirm, db)
