from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import TIMESTAMP, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .file_tag import File_Tag
    from .folder import Folder


class File(Base):
    """
    File SQLAlchemy model.

    Represents a file inside a folder, optionally with content and associated tags.

    Attributes:
        id (int): Primary key ID of the file.
        created_at (datetime): Timestamp when the file was created.
        folder_id (int): Foreign key referencing the parent folder.
        name (str): Name of the file.
        description (Optional[str]): Optional description of the file.
        content (Optional[str]): Optional content of the file.
        folder (Folder): Relationship to the parent folder.
        tags (List[File_Tag]): Tags associated with the file.
    """

    __tablename__ = "file"

    # Columns
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now(), nullable=False)
    folder_id: Mapped[int] = mapped_column(ForeignKey("folder.id"))
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    content: Mapped[Optional[Text]] = mapped_column(Text, nullable=True)

    # Relationships
    folder: Mapped["Folder"] = relationship(back_populates="files", cascade="all, delete-orphan")
    tags: Mapped[List["File_Tag"]] = relationship(back_populates="files", cascade="all, delete-orphan")
