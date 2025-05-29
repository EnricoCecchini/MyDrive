from datetime import datetime

from pydantic import BaseModel


class UserUpdatePasswordRequest(BaseModel):
    password: str
    password_confirm: str


class UserProfileResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime
