from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import File, Folder


def service_update_document(uuid: int, document_id: int, content: str, db: Session, name: str = "New Document") -> dict:
    """
    Service func to update a document.

    Args:
        `uuid` (`int`) - ID of user.
        `document_id` (`int`) - ID of document to update.
        `content` (`str`) - Updated content of document.
        `db` (`Session`) - SQLAlchemy session for querying.
        `name` (`str`) - Name of new document (Default is `New Document`).

    Returns:
        `dict[str, str]` - Dict with response and new document ID.
    """

    print("[cyan]Updating file content...[/cyan]")
    try:
        print("[yellow]Fetching file data...[/yellow]")

        file_update = db.query(File).filter(File.id == document_id).join(Folder).filter(Folder.user_id == uuid).first()
        if not file_update:
            print("[red]File not found...[/red]")
            raise HTTPException(status_code=500, detail="File not found.")

        print("[cyan]Updating document content...[/cyan]")
        file_update.name = name
        file_update.content = content

        db.commit()
        db.refresh(file_update)

        return {
            "message": "Document created successfully.",
            "status_code": 200,
        }

    except Exception as e:
        print("[red]Error creating new document:[/red]", e)
        raise HTTPException(status_code=500, detail="Error creating new document.")
