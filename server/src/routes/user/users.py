from fastapi import APIRouter, Depends
from src.utils import needs_auth

users_router = APIRouter(prefix="/users", tags=["Users"])

@users_router.get("/test")
def test_route():
    return {
        "message": "Hello World"
    }

@users_router.get("/profile")
def route_profile(auth: dict = Depends(needs_auth)):
    print(auth)
    return {
        "message": "This you?"
    }