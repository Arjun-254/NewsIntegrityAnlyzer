from pydantic import BaseModel, Field
from fastapi import UploadFile
from typing import List


class inputRequest(BaseModel):
    input: str
