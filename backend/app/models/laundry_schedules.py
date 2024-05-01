from sqlmodel import Field, SQLModel

class LaundrySchedule(SQLModel, table=True):
    __tablename__ = "laundry_schedule"
    id: int | None = Field(default=None, primary_key=True)
    laundry_id: int | None = Field(default=None, foreign_key="laundry.id", nullable=False)
    schedule_id: int | None = Field(default=None, foreign_key="schedule.id", nullable=False)