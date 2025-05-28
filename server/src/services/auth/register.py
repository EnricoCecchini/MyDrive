from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_
from src.models import User
from src.schemas import RegisterRequest
from src.utils import Hash


def service_register(user: RegisterRequest, db: Session) -> dict[str]:
    """
    Service func to register a new user.

    Args:
        `user` (`RegisterRequest`) - User information to register.
        `db` (`Session`) - SQLAlchemy session for querying.

    Returns:
        `dict[str]` - Dict with result of the query.
    """

    print("[blue]Beginning User Registration.[/blue]")

    print("Checking if user exists...")
    if db.query(User).filter(or_(User.email == user.email, User.username == user.username)).first():
        raise HTTPException(status_code=400, detail="Email or username already exists")

    print("Checking passwords...")
    if user.password != user.password_confirm:
        raise HTTPException(status_code=400, detail="Passwords don't match.")

    # Hash user password and create new user
    hashed_pwd = Hash.bcrypt(user.password)
    new_user = User(
        email=user.email,
        username=user.username,
        password_hash=hashed_pwd
    )

    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)

    except Exception as e:
        print("[red]Error registering new user:[/red]", e)
        raise HTTPException(status_code=500, detail="Error registering user.")

    return {
        "message": "User registered successfully.",
        "status_code": 200
    }
