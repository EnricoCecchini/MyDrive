import os

from fastapi import HTTPException, File as FastAPI_File
from sqlalchemy.orm import Session
from sqlalchemy import desc
from src.models import Folder, File, File_Type


def service_file_upload(uuid: int, file: FastAPI_File, folder_hash: str, db: Session) -> dict:
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

    pass