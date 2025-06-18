from typing import List, Optional

from fastapi import HTTPException
from sqlalchemy import and_, desc, or_
from sqlalchemy.orm import Session, aliased
from src.models import File, File_Tag, Folder, Folder_Tag, Tag


def service_dashboard_search(uuid: int, text: Optional[str], tags: Optional[List[str]], db: Session) -> dict[str, str]:
    """
    Service func to search for files/folders.

    Args:
        `uuid` (`int`) - User ID.
        `text` (`str`) - Text to search.
        `tags` (`Optional[str]`) - tags to search.
        `db` (`Session`) - Session instance to query the database.

    Returns:
        `dict[str]` - Dict with result of the query.
    """

    print("[cyan]Beginning search query[/cyan]")

    try:
        TagFolder = aliased(Tag)
        TagFile = aliased(Tag)

        print("[cyan]Selecting matching folders[/cyan]")
        res_folders = (
            db.query(Folder)
            .outerjoin(Folder_Tag, Folder.id == Folder_Tag.folder_id)
            .outerjoin(TagFolder, TagFolder.id == Folder_Tag.tag_id)
            .filter(Folder.user_id == uuid)
        )
        print(f"[cyan]{res_folders.count()} total folders selected before filtering...[/cyan]")

        print("[cyan]Selecting matching files[/cyan]")
        res_files = (
            db.query(File)
            .outerjoin(File_Tag, File.id == File_Tag.file_id)
            .outerjoin(TagFile, TagFile.id == File_Tag.tag_id)
            .join(File.folder)
            .filter(Folder.user_id == uuid)
        )
        print(f"[green]{res_files.count()} total files selected before filtering...[/green]")

        if text:
            text = f"%{text}%"

            print("[cyan]Begin filtering folders.[/cyan]")
            res_folders = res_folders.filter(or_(
                Folder.name.ilike(text),
                Folder.description.ilike(text),
                TagFolder.name.ilike(text)
            ))
            print(f"[green]{res_folders.count()} total folders selected after filtering...[/green]")

            print("[cyan]Begin filtering files.[/cyan]")
            res_files = res_files.filter(or_(
                File.name.ilike(text),
                File.description.ilike(text),
                File.content.ilike(text),
                TagFile.name.ilike(text)
            ))
            print(f"[green]{res_files.count()} total files selected after filtering...[/green]")

        res_folders = res_folders.order_by(desc(Folder.created_at), desc(Folder.id)).all()
        res_files = res_files.order_by(desc(File.created_at), desc(File.id)).all()

        data = {
            "folders": [{
                    "name": folder.name,
                    "hash": folder.hash,
                    "date_created": folder.created_at,
                    "tags": [{"id": tag.tag.id, "name": tag.tag.name} for tag in folder.tags]
                } for folder in res_folders
            ],
            "files": [{
                "name": file.name,
                "file_hash": file.hash,
                "type": file.type.id,
                "type_name": file.type.name,
                "date_created": file.created_at,
                "tags": [{"id": tag.tag.id, "name": tag.tag.name} for tag in file.tags]
            } for file in res_files]
        }

        return {
            "status_code": 200,
            "message": "Search succesful",
            "data": data
        }

    except Exception as e:
        print("[red]Error searching for files/folders:[/red]", e)
        raise HTTPException(status_code=500, detail="Error searching for files or folders.")
