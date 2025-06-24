import uuid
from src.models import Base
from sqlalchemy.orm import Session


def generate_hash(table: Base, db: Session) -> str:
    """
    Util func to generate a random hash to identify files and folders through the URL.

    Returns:
        `str` - Random hash string.
    """

    while True:
        hash_value = uuid.uuid4().hex[:32]
        exists = db.query(table).filter(table.hash == hash_value).first()
        if not exists:
            return hash_value
