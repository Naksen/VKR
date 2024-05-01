from typing import Optional
from datetime import datetime

from sqlmodel import Field, SQLModel
from pydantic import validator

class ScheduleBase(SQLModel):
    start_time: datetime
    end_time: datetime

    @validator("end_time")
    def end_time_must_be_greater_than_start_time(cls, v, values):
        if "start_time" in values and v < values["start_time"]:
            raise ValueError("end_time must be greater than or equal to start_time")
        return v


class ScheduleCreate(ScheduleBase):
    pass


class ScheduleUpdate(ScheduleBase):
    start_time: datetime | None = None
    end_time: datetime | None = None


class Schedule(ScheduleBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    
    def is_allowed(
        self,
        new_start_time: datetime,
        new_end_time: datetime
    ) -> bool:
        if (
            (new_end_time <= self.start_time) or
            (new_start_time >= self.end_time)
        ):
            return True
        return False


class ScheduleOut(ScheduleBase):
    id: int
    user_id: int


class SchedulesOut(SQLModel):
    data: list[ScheduleOut]
    count: int