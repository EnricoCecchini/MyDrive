import os

from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from src.models import Folder, File, File_Type


def service_get_folder_content(uuid: int, db: Session, folder_hash: str = None) -> dict[str, str]:
    """
    Service func to get folder content.

    Args:
        `uuid` (`int`) - User ID.
        `db` (`Session`) - Session instance to query the database.
        `folder_hash` (`str`) - OPTIONAL. Folder hash.

    Returns:
        `dict[str]` - Dict with result of the query.
    """

    print("[cyan]Fetching folder content...[/cyan]")

    try:
        curr_folder = None
        print("Fetching folder...")
        # Check if default folder
        if not folder_hash:
            curr_folder = db.query(Folder).filter(Folder.user_id == uuid, Folder.parent_id == None).first()
        else:
            # Get folder by hash
            curr_folder = db.query(Folder).filter(Folder.user_id == uuid, Folder.hash == folder_hash).first()

        if not curr_folder:
            raise HTTPException(status_code=404, detail="Folder not found.")

        print("Fetching folder content...")
        content_folders = db.query(Folder).filter(Folder.parent_id ==curr_folder.id).order_by(desc(Folder.id)).all()
        content_files = db.query(File).filter(File.folder_id == curr_folder.id).join(File_Type, File_Type.id == File.type_id).order_by(desc(File.id)).all()

        print(content_folders)

        data = {
            "folders": [folder.to_dict() for folder in content_folders],
            "files": [{
                "name": file.name,
                "file_hash": file.hash,
                "type": file.type.id,
                "type_name": file.type.name,
                "date_created": file.created_at,
                "tags": [{"id": tag.id, "name": tag.name} for tag in file.tags]
            } for file in content_files]
        }

        return {
            "status_code": 200,
            "message": "Folder content fetched succesfully",
            "data": data
        }

    except Exception as e:
        print("[red]Error fetching folder:[/red]", e)
        raise HTTPException(status_code=500, detail="Error fetching folder.")

    return {
        "status_code": 201,
        "message": "Folder created succesfully"
    }