from sqlmodel import Field, SQLModel
from datetime import datetime

class LaundrySchedule(SQLModel, table=True):
    __tablename__ = "laundry_schedule"
    id: int | None = Field(default=None, primary_key=True)
    laundry_id: int | None = Field(default=None, foreign_key="laundry.id", nullable=False)
    schedule_id: int | None = Field(default=None, foreign_key="schedule.id", nullable=False)


class LaundryScheduleOut(SQLModel):
    id: int
    start_time: datetime
    end_time: datetime
    room: str
    washing_machine_number: int

class LaundrySchedulesOut(SQLModel):
    data: list[LaundryScheduleOut]
    count: int