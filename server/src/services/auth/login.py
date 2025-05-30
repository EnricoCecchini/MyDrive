from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from src.models import User
from src.schemas import LoginRequest
from src.utils import Hash, generate_token


def service_login(user: LoginRequest, db: Session) -> dict[str, str]:
    """
    Service func to handle user login.

    Args:
        `user` (`LoginRequest`) - User information for login.
        `db` (`Session`) - SQLAlchemy session for querying.

    Returns:
        `dict[str, str]` - Dict with JWT token and token_type.
    """

    if not user.username or not user.password:
        print("[orange]Missing username or password for login.[/orange]")
        raise HTTPException(status_code=400, detail="Missing fields.")

    user_exists = db.query(User).filter(or_(User.email == user.username, User.username == user.username)).first()
    if not user_exists:
        print("[orange]This username or email does not exist.[/orange]")
        raise HTTPException(status_code=400, detail="User does not exist.")

    # Verify password
    is_valid = Hash.verify(user.password, user_exists.password_hash)

    if not is_valid:
        print("[red]Invalid username and password.[/red]")
        raise HTTPException(status_code=400, detail="Invalid username or password.")

    token = generate_token(user_exists.id)
    return {
        "message": "Login successful.",
        "access_token": token,
        "token_type": "Bearer"
    }