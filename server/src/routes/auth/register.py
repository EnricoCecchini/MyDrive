from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from src.schemas import RegisterRequest
from src.utils import db_session

from src.services import service_register

register_router = APIRouter()


@register_router.post("/register")
def route_register(user: RegisterRequest, db: Session = Depends(db_session.get_session)):
    return service_register(user=user, db=db)