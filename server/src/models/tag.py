from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import TIMESTAMP, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .file_tag import File_Tag
    from .folder_tag import Folder_Tag
    from .user import User


class Tag(Base):
    """
    Tag SQLAlchemy model.

    Represents a tag created by a user or a default tag. Tags can be associated with folders and files.

    Attributes:
        id (int): Primary key ID of the tag.
        created_at (datetime): Timestamp when the tag was created.
        user_id (Optional[int]): Foreign key referencing the user who owns the tag.
        name (str): Name of the tag (must be unique per user).
        description (Optional[str]): Description or note about the tag.
        user (User): Relationship to the user who owns the tag.
        folders (List[Folder_Tag]): Link table relationships to folders tagged with this tag.
        files (List[File_Tag]): Link table relationships to files tagged with this tag.
    """

    __tablename__ = "tag"
    __table_args__ = (
        UniqueConstraint('user_id', 'name', name='uq_user_tagname'),
    )

    # Columns
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now(), nullable=False)
    user_id: Mapped[Optional[int]] = mapped_column(ForeignKey("user.id"), nullable=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)

    # Relatioships
    user: Mapped["User"] = relationship(back_populates="tags")
    folders: Mapped[List["Folder_Tag"]] = relationship(back_populates="tag", cascade="all, delete-orphan")
    files: Mapped[List["File_Tag"]] = relationship(back_populates="tag", cascade="all, delete-orphan")
