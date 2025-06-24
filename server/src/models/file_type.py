from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import TIMESTAMP, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .file import File
    from .content_type import Content_Type


class File_Type(Base):
    """
    User SQLAlchemy model.

    Represents a file type in the system.

    Attributes:
        - `id` (`int`) - Primary key ID of the file type.
        - `created_at` (`datetime`) - Timestamp when the file type was created.
        - `name` (`str`) - Unique file type name.
        - `content_type_id` (`int`) - FK ID for content_type.
        - `mime_type_fill` (`str`) - Full mime_type of file type.
    """

    __tablename__ = "file_type"

    # Columns
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now(), nullable=False)
    name: Mapped[str] = mapped_column(String(255), unique=True)
    content_type_id: Mapped[int] = mapped_column(ForeignKey("content_type.id"), nullable=False)
    mime_type_full: Mapped[Optional[str]] = mapped_column(String(255), nullable=False, unique=True)

    # Relationships
    files: Mapped[List["File"]] = relationship(back_populates="type", cascade="all, delete-orphan")
    content_type: Mapped["Content_Type"] = relationship(back_populates="file_types")