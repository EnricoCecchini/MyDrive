from datetime import datetime

from pydantic import BaseModel


class NewFileRequest(BaseModel):
    name: str
    folder_id: int
    type: int

class FileGetResponse(BaseModel):
    id: int
    name: str
    content: str
    type:int
