from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from src.schemas import LoginRequest
from src.utils import db_session

from src.services import service_login

login_router = APIRouter()


@login_router.post("/login")
def route_login(user: LoginRequest, db: Session = Depends(db_session.get_session)):
    return service_login(user=user, db=db)