from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.schemas import UserProfileResponse, UserUpdatePasswordRequest
from src.services.user import service_update_password, service_user_profile
from src.utils import db_session, needs_auth

users_router = APIRouter(prefix="/users", tags=["Users"])


@users_router.get("/test")
def test_route():
    return {
        "message": "Hello World"
    }

@users_router.get("/profile", response_model=UserProfileResponse)
def route_profile(auth: dict = Depends(needs_auth), db: Session = Depends(db_session.get_session)):
    return service_user_profile(int(auth.get("sub")), db)

@users_router.post("/update_password")
def route_update_password(
    data: UserUpdatePasswordRequest,
    auth: dict = Depends(needs_auth),
    db: Session = Depends(db_session.get_session)
):
    return service_update_password(int(auth.get("sub")), data.password, data.password_confirm, db)