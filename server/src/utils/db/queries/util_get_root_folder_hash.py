from src.models import Folder
from fastapi import HTTPException
from sqlalchemy.orm import Session


def get_root_folder_hash(db: Session, uuid: int) -> str:
    """
    Util func to get root folder hash.

    Args:
        `db` (`Session`) - SQLAlchemy session.
        `uuid` (`int`) - User ID.

    Returns:
        `str` - Hash for user root folder.
    """

    root = db.query(Folder).filter(Folder.user_id == uuid, Folder.parent_id.is_(None)).first()
    if not root:
        raise HTTPException(status_code=404, detail="Root folder not found.")

    return root.hash