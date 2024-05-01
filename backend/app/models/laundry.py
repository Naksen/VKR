from typing import TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel
from datetime import datetime

class LaundryBase(SQLModel):
    room: str
    washing_machine_number: int
    is_busy: bool = False


class LaundryCreate(LaundryBase):
    pass

class LaundryUpdate(LaundryBase):
    room: str | None = None
    washing_machine_number: int | None = None
    is_busy: bool | None = None

class Laundry(LaundryBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    updated_at: datetime | None = Field(
        default_factory=datetime.utcnow, sa_column_kwargs={"onupdate": datetime.utcnow}
    )
    created_at: datetime | None = Field(default_factory=datetime.utcnow)

class LaundryOut(LaundryBase):
    id: int
    updated_at: datetime
    created_at: datetime

class LaundriesOut(SQLModel):
    data: list[LaundryOut]
    count: int