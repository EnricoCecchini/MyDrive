from typing import Optional, List

from sqlalchemy import TIMESTAMP, String, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from .base import Base


class Folder(Base):
    __tablename__ = "folder"

    # Columns
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now(), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    parent_id: Mapped[Optional[int]] = mapped_column(ForeignKey("folder.id"), nullable=True)
    name: Mapped[str] = mapped_column(String(255))
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    path: Mapped[Text] = mapped_column(Text, nullable=True)

    # Relationships
    user: Mapped["User"] = relationship(back_populates="folders")
    files: Mapped[List["File"]] = relationship(back_populates="folder", cascade="all, delete-orphan")
    tags: Mapped[List["Folder_Tag"]] = relationship(back_populates="folder", cascade="all, delete-orphan")

    # Sub-Folder Relationships
    children: Mapped[List["Folder"]] = relationship(back_populates="parent", cascade="all, delete-orphan")
    parent: Mapped[Optional["Folder"]] = relationship(back_populates="children", remote_side=[id])
