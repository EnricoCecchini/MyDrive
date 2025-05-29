from datetime import datetime

from pydantic import BaseModel


class UserProfileResponse(BaseModel):
    id: int
    username: str
    email: str
    created_at: datetime
