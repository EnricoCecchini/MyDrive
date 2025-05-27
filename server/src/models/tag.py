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
