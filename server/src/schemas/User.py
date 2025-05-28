from pydantic import BaseModel
from typing import Optional


class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str
    password_confirm: str


class LoginRequest(BaseModel):
    username: str
    password: str
