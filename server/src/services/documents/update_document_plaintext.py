from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import File, Folder, File_Diff
from src.utils import util_get_curr_date


def service_update_document_plaintext(uuid: int, document_hash: str, content: str, db: Session) -> dict:
    """
    Service func to update a document.

    Args:
        `uuid` (`int`) - ID of user.
        `document_hash` (`str`) - str of document to update.
        `content` (`str`) - Current plaintext content.
        `db` (`Session`) - SQLAlchemy session for querying.

    Returns:
        `dict[str, str]` - Dict with response and new document ID.
    """

    print("[cyan]Updating file content...[/cyan]")
    try:
        print("[yellow]Fetching file data...[/yellow]")

        file_update = db.query(File).filter(File.hash == document_hash).join(Folder).filter(Folder.user_id == uuid).first()
        if not file_update:
            print("[red]File not found...[/red]")
            raise HTTPException(status_code=404, detail="File not found.")

        print("[cyan]Updating document content...[/cyan]")
        file_update.content = content
        file_update.updated_at = util_get_curr_date()

        db.commit()
        db.refresh(file_update)

        return {
            "message": "Document updated successfully.",
            "status_code": 201,
        }

    except Exception as e:
        print("[red]Error creating new document:[/red]", e)
        raise HTTPException(status_code=500, detail="Error creating new document.")
