from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import TIMESTAMP, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .file import File
    from .folder_tag import Folder_Tag
    from .user import User


class Folder(Base):
    """
    Folder SQLAlchemy model.

    Represents a folder created by a user. Folders can have nested subfolders,
    files, and associated tags.

    Attributes:
        - id (int): Primary key ID of the folder.
        - created_at (datetime): Timestamp when the folder was created.
        - user_id (int): Foreign key referencing the folder's owner.
        - parent_id (Optional[int]): ID of the parent folder (if any).
        - name (str): Name of the folder.
        - description (Optional[str]): Optional description for the folder.
        - path (Optional[str]): Computed path or hierarchy reference.
        - hash (str): Uinique hash for the folder, generated on creation.
        - updated_at (datetime): Timestamp for latest file update.
        - user (User): Relationship to the folder's owner.
        - files (List[File]): List of files contained within the folder.
        - tags (List[Folder_Tag]): Tags associated with the folder.
        - children (List[Folder]): List of subfolders.
        - parent (Optional[Folder]): Reference to the parent folder.
    """

    __tablename__ = "folder"

    # Columns
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now(), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    parent_id: Mapped[Optional[int]] = mapped_column(ForeignKey("folder.id"), nullable=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    path: Mapped[Text] = mapped_column(Text, nullable=True)
    hash: Mapped[Optional[str]] = mapped_column(String(255), nullable=False, unique=True)
    updated_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now(), nullable=False)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="folders")
    files: Mapped[List["File"]] = relationship(back_populates="folder", cascade="all, delete-orphan")
    tags: Mapped[List["Folder_Tag"]] = relationship(back_populates="folder", cascade="all, delete-orphan")

    # Sub-Folder Relationships
    children: Mapped[List["Folder"]] = relationship(back_populates="parent", cascade="all, delete-orphan")
    parent: Mapped[Optional["Folder"]] = relationship(back_populates="children", remote_side=[id])
