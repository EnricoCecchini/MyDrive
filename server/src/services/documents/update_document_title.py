from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import File, Folder
from src.utils import util_get_curr_date


def service_update_document_title(uuid: int, document_hash: str, db: Session, name: str) -> dict:
    """
    Service func to update a document.

    Args:
        `uuid` (`int`) - ID of user.
        `document_hash` (`str`) - str of document to update.
        `db` (`Session`) - SQLAlchemy session for querying.
        `name` (`str`) - Name of new document (Default is `New Document`).

    Returns:
        `dict[str, str]` - Dict with response and new document ID.
    """

    print("[cyan]Updating document name...[/cyan]", uuid, document_hash, name)
    try:
        print("[yellow]Fetching document...[/yellow]")

        file_update = db.query(File).filter(File.hash == document_hash).join(Folder).filter(Folder.user_id == uuid).first()
        if not file_update:
            print("[red]Document not found...[/red]")
            raise HTTPException(status_code=404, detail="Document not found.")

        print(file_update.__dict__)

        print("[cyan]Updating document name...[/cyan]")
        file_update.name = name
        file_update.updated_at = util_get_curr_date()

        db.commit()
        db.refresh(file_update)

        return {
            "message": "Document renamed successfully.",
            "status_code": 200,
        }

    except Exception as e:
        print("[red]Error renaming document:[/red]", e)
        raise HTTPException(status_code=500, detail="Error renaming document.")
