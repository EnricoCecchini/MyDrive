from datetime import datetime
from typing import Literal

from pydantic import BaseModel


class NewFileRequest(BaseModel):
    title: str
    folder_id: int
    type: Literal['doc', 'sheet']
