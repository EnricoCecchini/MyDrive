from typing import TYPE_CHECKING

from sqlalchemy import TIMESTAMP, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .file import File
    from .tag import Tag


class File_Tag(Base):
    """
    File_Tag SQLAlchemy model.

    Join table between files and tags to support many-to-many relationships.

    Attributes:
        id (int): Primary key ID of the file-tag relationship.
        created_at (datetime): Timestamp when the relationship was created.
        file_id (int): Foreign key referencing the file.
        tag_id (int): Foreign key referencing the tag.
        file (File): Relationship to the associated file.
        tag (Tag): Relationship to the associated tag.
    """

    __tablename__ = "file_tag"

    # Columns
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now(), nullable=False)
    file_id: Mapped[int] = mapped_column(ForeignKey("file.id"))
    tag_id: Mapped[int] = mapped_column(ForeignKey("tag.id"))

    # Relationships
    file: Mapped["File"] = relationship(back_populates="tags")
    tag: Mapped["Tag"] = relationship(back_populates="files")
