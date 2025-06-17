from typing import TYPE_CHECKING

from sqlalchemy import TIMESTAMP, ForeignKey, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .file import File
    from .tag import User


class File_Diff(Base):
    """
    File_Diff SQLAlchemy model.

    Table to store diffs for QuillJS documents for version control.

    Attributes:
        - id (int): Primary key ID of the file-tag relationship.
        - created_at (datetime): Timestamp when the relationship was created.
        - file_id (int): Foreign key referencing the file.
        - user_id (int): Foreign key referencing the user.
        - content (dict): JSON with diff value.
        - file (File): Relationship to the associated file.
        - user (User): Relationship to the associated user.
    """

    __tablename__ = "file_diff"

    # Columns
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now(), nullable=False)
    file_id: Mapped[int] = mapped_column(ForeignKey("file.id"), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"), nullable=False)
    content: Mapped[JSON] = mapped_column(JSON, nullable=False)

    # Relationships
    file: Mapped["File"] = relationship(back_populates="diffs")
    user: Mapped["User"] = relationship(back_populates="diffs")
