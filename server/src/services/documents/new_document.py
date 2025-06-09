from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import File, Folder
from src.utils import generate_hash


def service_new_document(uuid: int, folder_id: int, type_id: int, db: Session, name: str = "New Document") -> dict:
    """
    Service func to create a new document.

    Args:
        `uuid` (`int`) - ID of user.
        `folder_id` (`int`) - ID of folder where document is created.
        `type_id` (`int`) - ID of document type.
        `db` (`Session`) - SQLAlchemy session for querying.
        `name` (`str`) - Name of new document (Default is `New Document`).

    Returns:
        `dict[str, str]` - Dict with response and new document ID.
    """

    try:
        print("[yellow]Checking user folder...[/yellow]")

        folder_exists = db.query(Folder).filter(Folder.id == folder_id, Folder.user_id == uuid).first()
        if not folder_exists:
            print("[red]Folder not found...[/red]")
            raise HTTPException(status_code=404, detail="Folder not found.")

    except Exception as e:
        print("[red]Folder not found...[/red]", e)
        raise HTTPException(status_code=404, detail="Folder not found.")

    try:
        new_hash = generate_hash(Folder, db)

        print("[cyan]Creating new document...[/cyan]")
        new_file = File(
            folder_id=folder_id,
            type_id=type_id,
            name=name,
            hash=new_hash
        )

        db.add(new_file)
        db.commit()
        db.refresh(new_file)

        return {
            "message": "Document created successfully.",
            "status_code": 201,
            "doc_id": new_file.id
        }

    except Exception as e:
        print("[red]Error creating new document:[/red]", e)
        raise HTTPException(status_code=500, detail="Error creating new document.")
