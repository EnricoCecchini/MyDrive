from fastapi import APIRouter

users_router = APIRouter(prefix="/users", tags=["Users"])

@users_router.get("/test")
def test_route():
    return {
        "message": "Hello World"
    }