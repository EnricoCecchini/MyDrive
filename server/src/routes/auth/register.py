from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.schemas import LoginRequest, RegisterRequest
from src.utils import db_session

auth_router = APIRouter("/auth", tags=["AUTH"])


@auth_router.post("/register")
def route_register(user: RegisterRequest, db: Session = Depends(db_session.get_session)):
    pass