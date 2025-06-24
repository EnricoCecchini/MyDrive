from typing import TYPE_CHECKING, List

from sqlalchemy import TIMESTAMP, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .file import File_Type


class Content_Type(Base):
    """
    User SQLAlchemy model.

    Represents a content type for file types.

    Attributes:
        - `id` (`int`) - Primary key ID of the content type.
        - `created_at` (`datetime`) - Timestamp when the content type was created.
        - `name` (`str`) - Unique content type name.
    """

    __tablename__ = "content_type"

    # Columns
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now(), nullable=False)
    name: Mapped[str] = mapped_column(String(255), unique=True)

    # Relationships
    file_types: Mapped[List["File_Type"]] = relationship(back_populates="content_type", cascade="all, delete-orphan")