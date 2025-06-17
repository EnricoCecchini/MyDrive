from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import User


def service_user_profile(uuid: int, db: Session) -> dict:
    """
    Service func to fetch user profile data.

    Args:
        `uuid` (`int`) - User ID decrypted from token.
        `db` (`Session`) - SQLAlchemy session for querying.

    Returns:
        `dict[str, str]` - Dict with user profile data.
    """

    try:
        result = db.query(User).filter(User.id == uuid).first()
        if not result:
            raise HTTPException(status_code=404, detail="User not found.")

        return result

    except Exception as e:
        print("[red]Error querying user profile:[/red]", e)
        raise HTTPException(status_code=500, detail="Error fetching user profile data.")
