from typing import TYPE_CHECKING, List

from sqlalchemy import TIMESTAMP, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .file import File


class File_Type(Base):
    """
    User SQLAlchemy model.

    Represents a file type in the system.

    Attributes:
        id (int): Primary key ID of the file type.
        created_at (datetime): Timestamp when the file type was created.
        name (str): Unique file type name.
    """

    __tablename__ = "file_type"

    # Columns
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now(), nullable=False)
    name: Mapped[str] = mapped_column(String(255), unique=True)

    # Relationships
    files: Mapped[List["File"]] = relationship(back_populates="type", cascade="all, delete-orphan")