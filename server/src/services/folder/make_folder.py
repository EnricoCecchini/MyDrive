import os

from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import Folder
from src.utils import generate_hash


def service_new_folder(uuid: int, db: Session, parent_id: int = None, name: str = None, path: str = None, description: str = None) -> dict[str, str]:
    """
    Helper func to create a new Folder.

    Args:
        `uuid` (`int`) - User ID.
        `parent_id` (`int`) - ID of parent folder if subfolder.
        `name` (`str`) - Name of folder.
        `path` (`str`) - Folder path.
        `db` (`Session`) - Session instance to query the database.
        `description` (`str`) - OPTIONAL. Folder description.

    Returns:
        `dict[str]` - Dict with result of the query.
    """

    print("[cyan]Creating new folder for file storage...[/cyan]")

    try:
        print("Fetching storage path...")
        BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        DEFAULT_CACHE_PATH = os.path.join(BASE_DIR, ".cache")
        BASE_PATH = os.path.join(os.getenv("STORAGE_PATH", DEFAULT_CACHE_PATH), "mydrive")


        print("Building folder path...")
        # Logic for folder path construction
        if parent_id is None:
            # Root folder: use UUID as the name
            folder_path = os.path.join(BASE_PATH, str(uuid))
            folder_name = str(uuid)
        else:
            # Subfolder: must provide `path` and `name`
            if not path or not name:
                raise ValueError("Subfolders require both 'path' and 'name'")

            path_db = db.query(Folder).filter(Folder.user_id == uuid, Folder.id == parent_id).first()
            if not path_db:
                raise HTTPException(status_code=404, detail="Parent folder not found.")

            folder_path = os.path.join(path_db, name)
            folder_name = name

        print("Final folder path:", folder_path)

        print("Creating folder in system...")
        # Create folders
        os.makedirs(folder_path, exist_ok=True)

        new_hash = generate_hash(Folder, db)

        print("Creating folder entry ind database...")
        # Register folders in database
        new_folder = Folder(
            user_id=uuid,
            parent_id=parent_id,
            name=folder_name,
            description=description,
            path=folder_path,
            hash=new_hash
        )

        print("Saving folder entry ind database...")
        db.add(new_folder)
        db.commit()
        db.refresh(new_folder)

    except Exception as e:
        print("[red]Error creating folder:[/red]", e)
        raise HTTPException(status_code=500, detail="Error creating folder.")

    return {
        "status_code": 201,
        "message": "Folder created succesfully"
    }