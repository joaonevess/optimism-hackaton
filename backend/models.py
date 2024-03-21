from enum import Enum
from pydantic import BaseModel


class ResponseType(Enum):
    BOOL = 0
    INT = 1
    STRING = 2

    def __str__(self):
        return self.name


class QueryRequestedEvent(BaseModel):
    requestId: int
    question: str
    responseType: ResponseType
    callerAddress: str
