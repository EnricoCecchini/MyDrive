from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import Folder


def get_folder(db: Session, folder_hash: str, uuid: int) -> int:
    """
    Util func to get folder ID by it's hash.

    Args:
        `db` (`Session`) - SQLAlchemy session.
        `folder_hash` (`str`) - Folder hash.
        `uuid` (`int`) - User ID.

    Returns:
        `Folder` - Folder object.
    """

    folder = db.query(Folder).filter(Folder.hash == folder_hash, Folder.user_id == uuid).first()
    if not folder:
        raise HTTPException(status_code=404, detail="Folder not found.")

    return folder