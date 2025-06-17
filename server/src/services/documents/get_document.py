from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import File, Folder, File_Diff
import json


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

        diff_content = db.query(File_Diff).filter(File_Diff.file_id == result.id).all()

        diffs_list = [d.content for d in diff_content]

        return {
            "id": result.id,
            "name": result.name,
            "content": json.dumps(diffs_list),
            "type": result.type_id
        }

    except Exception as e:
        print("[red]Error fetching document:[/red]", e)
        raise HTTPException(status_code=500, detail="Error fetching document.")
