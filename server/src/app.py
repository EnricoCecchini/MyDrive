from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import *

app = FastAPI()
router = APIRouter(prefix="/api")

router.include_router(users_router)
router.include_router(auth_router)
router.include_router(documents_router)
router.include_router(folder_router)
router.include_router(file_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@router.get("/test")
def test_route():
    return {
        "message": "Success"
    }


app.include_router(router)
