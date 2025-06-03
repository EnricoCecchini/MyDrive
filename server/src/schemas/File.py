from datetime import datetime

from pydantic import BaseModel


class NewFileRequest(BaseModel):
    name: str
    folder_id: int
    type: int
