from sqlmodel import Field, SQLModel
from datetime import datetime
from enum import Enum


class AreaEnum(str, Enum):
    sport = "sport"
    dancing = "dancing"
    gaming = "gaming"
    other = "other"

class PublicAreaSchedule(SQLModel, table=True):
    __tablename__ = "public_area_schedule"
    id: int | None = Field(default=None, primary_key=True)
    public_area_id: int | None = Field(default=None, foreign_key="public_area.id", nullable=False)
    schedule_id: int | None = Field(default=None, foreign_key="schedule.id", nullable=False)

class PublicAreaScheduleOut(SQLModel):
    id: int
    start_time: datetime
    end_time: datetime
    name: str
    area_type: AreaEnum

class PublicAreaSchedulesOut(SQLModel):
    data: list[PublicAreaScheduleOut]
    count: int