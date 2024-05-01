from sqlmodel import Field, SQLModel

class PublicAreaSchedule(SQLModel, table=True):
    __tablename__ = "public_area_schedule"
    id: int | None = Field(default=None, primary_key=True)
    public_area_id: int | None = Field(default=None, foreign_key="public_area.id", nullable=False)
    schedule_id: int | None = Field(default=None, foreign_key="schedule.id", nullable=False)