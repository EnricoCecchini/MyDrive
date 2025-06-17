from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import File, Folder


def service_delete_document(uuid: int, document_hash: str, db: Session) -> dict:
    """
    Service func to delete a document.

    Args:
        `uuid` (`int`) - ID of user.
        `document_hash` (`str`) - Hash str of document to delete.
        `db` (`Session`) - SQLAlchemy session for querying.

    Returns:
        `dict[str, str]` - Dict with response.
    """

    print("[cyan]Deleting document name...[/cyan]", uuid, document_hash)
    try:
        print("[yellow]Fetching document...[/yellow]")

        file_delete = db.query(File).filter(File.hash == document_hash).join(Folder).filter(Folder.user_id == uuid).first()
        if not file_delete:
            print("[red]Document not found...[/red]")
            raise HTTPException(status_code=404, detail="Document not found.")

        print("[cyan]DELETING DOCUMENT...[/cyan]")
        db.delete(file_delete)
        db.commit()

        return {
            "message": "Document deleted successfully.",
            "status_code": 200,
        }

    except Exception as e:
        print("[red]Error deleting document:[/red]", e)
        raise HTTPException(status_code=500, detail="Error deleting document.")
