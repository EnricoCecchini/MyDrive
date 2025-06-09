from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import User
from src.utils import Hash


def service_update_password(uuid: int, password: str, password_confirm: str, db: Session) -> dict:
    """
    Service func to update a user's password.

    Args:
        `uuid` (`int`) - User ID decrypted from token.
        `password` (`str`) - New password.
        `password_confirm` (`str`) - New password confirmation.
        `db` (`Session`) - SQLAlchemy session for querying.

    Returns:
        `dict[str, str]` - Dict with user profile data.
    """

    if not uuid or not password or not password_confirm:
        print("[red]Missing fields to update password.[/red]")
        raise HTTPException(status_code=400, detail="Missing fields.")

    if password != password_confirm:
        print("[red]Passwords don't match.[/red]")
        raise HTTPException(status_code=400, detail="Passwords don't match.")

    if len(password) < 6:
        raise HTTPException(status_code=400, detail="Passwords must be at least 6 characters long.")

    try:
        result = db.query(User).filter(User.id == uuid).first()
        if not result:
            raise HTTPException(status_code=404, detail="User not found.")

        result.password_hash = Hash.bcrypt(password)

        db.commit()
        db.refresh(result)

    except Exception as e:
        print("[red]Error querying user profile:[/red]", e)
        raise HTTPException(status_code=500, detail="Error fetching user profile data.")

    return {
        "message": "Password updated successfully.",
        "status_code": 201
    }
