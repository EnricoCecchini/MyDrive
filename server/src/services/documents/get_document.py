from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import File, Folder


def service_get_document(uuid: int, document_hash: str, db: Session) -> dict:
    """
    Service func to get a database document.

    Args:
        `uuid` (`int`) - ID of user.
        `document_hash` (`str`) - Hash of document.
        `db` (`Session`) - SQLAlchemy session for querying.

    Returns:
        `dict[str, str]` - Dict with document data.
    """

    try:
        print("[cyan]Fetching user document...[/cyan]")

        result = db.query(File).filter(File.hash == document_hash).join(Folder).filter(Folder.id == File.folder_id, Folder.user_id == uuid).first()
        if not result:
            print("[red]Document not found...[/red]")
            raise HTTPException(status_code=404, detail="Document not found.")

        return {
            "id": result.id,
            "name": result.name,
            "content": result.content or "",
            "type": result.type_id
        }

    except Exception as e:
        print("[red]Error fetching document:[/red]", e)
        raise HTTPException(status_code=500, detail="Error fetching document.")
