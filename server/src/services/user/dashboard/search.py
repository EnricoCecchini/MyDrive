from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc, or_, and_
from src.models import Folder, Tag, File

from typing import List, Optional


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

        print("[cyan]Selecting matching folders[/cyan]")
        res_folders = (
            db.query(Folder)
            .outerjoin(Folder.tags)
            .filter(Folder.user_id == uuid)
        )
        print(f"[cyan]{res_folders.count()} total folders selected before filtering...[/cyan]")

        print("[cyan]Selecting matching files[/cyan]")
        res_files = (
            db.query(File)
            .outerjoin(File.tags)
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
                Tag.name.ilike(text)
            )).all()
            print(f"[green]{len(res_folders)} total folders selected after filtering...[/green]")

            print("[cyan]Begin filtering files.[/cyan]")
            res_files = res_files.filter(or_(
                File.name.ilike(text),
                File.description.ilike(text),
                File.content.ilike(text),
                Tag.name.ilike(text)
            )).all()
            print(f"[green]{len(res_files)} total files selected after filtering...[/green]")

        return {
            "status_code": 200,
            "message": "Search succesful",
            "data": []
        }

    except Exception as e:
        print("[red]Error searching for files/folders:[/red]", e)
        raise HTTPException(status_code=500, detail="Error searching for files or folders.")