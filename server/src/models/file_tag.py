from sqlalchemy import TIMESTAMP, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from .base import Base

from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .file import File
    from .tag import Tag


class File_Tag(Base):
    __tablename__ = "file_tag"

    # Columns
    id: Mapped[int] = mapped_column(primary_key=True)
    created_at: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP, default=func.now(), server_default=func.now(), nullable=False)
    file_id: Mapped[int] = mapped_column(ForeignKey("file.id"))
    tag_id: Mapped[int] = mapped_column(ForeignKey("tag.id"))

    # Relationships
    file: Mapped["File"] = relationship(back_populates="tags")
    tag: Mapped["Tag"] = relationship(back_populates="files")
