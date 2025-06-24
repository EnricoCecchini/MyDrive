import os

from fastapi import File as FastAPI_File
from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models import Content_Type, File, File_Type, Folder
from src.utils import get_folder, generate_hash
from datetime import datetime


def _identify_file_type(file_ext: str, mime_major: str, mime_subtype: str, db: Session) -> File_Type | None:
    """
    Function to identify File_Type.

    Args:
        - `file_ext` (`str`) - File extension.
        - `mime_major` (`str`) - Mime_type content-type section name.
        - `mime_subtype` (`str`) - Mime_type full name.
        - `db` (`Session`) - SQLAlchemy session to handle DB queries.

    Returns:
        - `File_Type` - Returns File_Type object if File_Type exists, else None to set as OTHER file_type.
    """
    try:
        new_file_type = (
            db.query(File_Type)
            .join(Content_Type, Content_Type.id == File_Type.content_type_id)
            .filter(
                File_Type.name == file_ext,
                Content_Type.name == mime_major,
                File_Type.mime_type_full == mime_subtype
            )
        ).first()

        print(f"[green]File identified as type: {new_file_type.name or 'OTHER'}.[/green]")
        return new_file_type

    except Exception as e:
        print("[red]Error identifying uploaded file type:[/red]", e)
        raise HTTPException(status_code=500, detail="Error identifying uploaded file type.")


async def _save_file_to_path(uuid: int, file: FastAPI_File, file_name: str, target_dir: Folder, db: Session) -> str:
    """
    Function to save file in desired path.

    Args:
        - `uuid` (`int`) - User ID.
        - `file` (`FastAPI.File`) - Uploaded file to store.
        - `folder_hash` (`str`) - Hash of folder where file is to be stored.
        - `file_name` (`str`) - Formatted filename with timestamp.
        - `db` (`Session`) - SQLAlchemy session to handle DB queries.

    Returns:
        - `str` - Uploaded file path.
    """

    if not os.path.exists(target_dir.path):
        print("[red]Target directory does not exist.[/red]")
        raise HTTPException(status_code=404, detail="Target directory does not exist.")

    print("[cyan]Saving file.[/cyan]")
    file_path = os.path.join(target_dir.path, file_name)

    if os.path.exists(file_path):
        print("[red]A file with this name already exists in this folder.[/red]")
        raise HTTPException(status_code=409, detail="A file with this name already exists in this folder.")

    try:
        with open(file_path, "wb") as f:
            while chunk := await file.read(1024 * 1024):
                f.write(chunk)

        return file_path

    except Exception as e:
        print("[red]Error saving file to dir:[/red]", e)
        raise HTTPException(status_code=500, detail="Error saving file to dir.")


def _format_filename_timestamp(filename: str, timestamp: datetime) -> str:
    """
    Function to append timestamp to filename to handle separate files with the same name in file system.

    Args:
        - `filename` (`str`) - File name.
        - `timestamp` (`datetime`) - Timestamp.

    Returns:
        `str` - File name with timestamp.
    """
    timestamp = timestamp.strftime("%Y%m%d%H%M%S%f")
    name, ext = os.path.splitext(filename)
    return f"{name}_{timestamp}{ext}"

async def service_file_upload(uuid: int, file: FastAPI_File, folder_hash: str, db: Session) -> dict:
    """
    Service func to handle registering uploaded file in DB and save to desired folder.

    Args:
        - `uuid` (`int`) - User ID.
        - `file` (`FastAPI.File`) - Uploaded file to store.
        - `folder_hash` (`str`) - Hash of folder where file is to be stored.
        - `db` (`Session`) - SQLAlchemy session to handle DB queries.

    Returns:
        - `dict` - Dict with status code and response message
    """

    print("[cyan]Beginning file processing.[/cyan]")
    # Get file_type from filename
    mime_major, mime_subtype = file.headers.get('content-type').split("/")
    file_ext = file.filename.split(".")[-1].lower()

    print("[cyan]Ideintifying file and content type.[/cyan]")
    new_file_type = _identify_file_type(
        file_ext=file_ext,
        mime_major=mime_major,
        mime_subtype=mime_subtype,
        db=db
    )

    print("[cyan]Getting folder to store file.[/cyan]")
    target_dir = get_folder(db=db, folder_hash=folder_hash, uuid=uuid)

    try:
        print("[cyan]Generating file hash.[/cyan]")
        new_hash = generate_hash(Folder, db)
        new_file = File(
            folder_id=target_dir.id,
            type_id=new_file_type.id,
            name=file.filename,
            hash=new_hash
        )

        db.add(new_file)
        db.commit()
        db.refresh(new_file)

        print("[cyan]File registered in database[/cyan]")

        # Format name with timestamp
        file_name = _format_filename_timestamp(filename=file.filename, timestamp=new_file.created_at)

        print("[cyan]Saving file to path.[/cyan]")
        file_path = await _save_file_to_path(uuid=uuid, file=file, file_name=file_name, target_dir=target_dir, db=db)

        return {
            "message": "File uploaded successfully.",
        }

    # Raise original HTTPException if a previous exception occurred.
    except HTTPException:
        raise

    except Exception as e:
        print("[cyan]Saving file.[/cyan]")

        if "file_path" in locals() and os.path.exists(file_path):
            try:
                os.remove(file_path)
                print("[yellow]Deleted orphaned file after DB error.[/yellow]")
            except Exception as cleanup_err:
                print("[red]Failed to delete orphaned file after DB error:[/red]", cleanup_err)

        db.rollback()
        print("[red]Error registering uploaded file to the database:[/red]", e)
        raise HTTPException(status_code=400, detail="Error registering uploaded file to the database.") from e