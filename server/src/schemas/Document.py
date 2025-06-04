from datetime import datetime

from pydantic import BaseModel


class DocumentNewRequest(BaseModel):
    name: str
    folder_id: int
    type: int

class DocumentUpdateContentRequest(BaseModel):
    content: str

class DocumentGetResponse(BaseModel):
    id: int
    name: str
    content: str
    type:int
