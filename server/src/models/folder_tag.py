from typing import TYPE_CHECKING

from sqlalchemy import TIMESTAMP, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .folder import Folder
    from .tag import Tag


class Folder_Tag(Base):
    __tablename__ = "folder_tag"

    # Columns
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now(), nullable=False)
    folder_id: Mapped[int] = mapped_column(ForeignKey("folder.id"))
    tag_id: Mapped[int] = mapped_column(ForeignKey("tag.id"))

    # Relationships
    folder: Mapped["Folder"] = relationship(back_populates="tags")
    tag: Mapped["Tag"] = relationship(back_populates="folders")
