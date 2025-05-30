from sqlalchemy.orm import Session


def service_new_folder(uuid: int, parent_id: int, name: str, path: str, db: Session, description: str = "") -> dict[str, str]:
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

    pass