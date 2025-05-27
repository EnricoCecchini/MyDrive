from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import TIMESTAMP, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .file_tag import File_Tag
    from .folder import Folder


class File(Base):
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
