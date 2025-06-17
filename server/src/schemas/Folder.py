from datetime import datetime
from typing import Literal

from pydantic import BaseModel


class NewFolderRequest(BaseModel):
    name: str
    parent_hash: str


