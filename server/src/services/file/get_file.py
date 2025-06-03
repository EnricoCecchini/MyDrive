from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import File, Folder


def service_get_document(uuid: int, file_id: int, db: Session) -> dict:
    """
    Service func to create a new file.

    Args:
        `uuid` (`int`) - ID of user.
        `file_id` (`int`) - ID of file.
        `db` (`Session`) - SQLAlchemy session for querying.

    Returns:
        `dict[str, str]` - Dict with file data.
    """

    try:
        print("[cyan]Fetching user document...[/cyan]")

        result = db.query(File).filter(File.id == file_id).join(Folder).filter(Folder.id == File.folder_id, Folder.user_id == uuid).first()
        if not result:
            print("[red]File not found...[/red]")
            raise HTTPException(status_code=500, detail="File not found.")

        return {
            "id": result.id,
            "name": result.name,
            "content": result.content or "",
            "type": result.type_id
        }

    except Exception as e:
        print("[red]Error fetching document:[/red]", e)
        raise HTTPException(status_code=500, detail="Error fetching document.")
