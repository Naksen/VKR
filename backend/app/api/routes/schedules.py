from typing import Any
import datetime
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select, Session

from app.api.deps import CurrentUser, SessionDep
from app.models.laundry import (
    Laundry,
    LaundryOut,
    LaundriesOut,
)
from app.models.laundry_schedules import (
    LaundrySchedule, LaundrySchedulesOut
)
from app.models.public_area import (
    PublicArea,
    PublicAreaOut,
    PublicAreasOut
)
from app.models.public_area_schedule import (
    PublicAreaSchedule, PublicAreaSchedulesOut
)
from app.models.schedule import (
    Schedule,
    ScheduleCreate,
    SchedulesOut,
    ScheduleOut,
    ScheduleUpdate
)

from app.models.common import Message

router = APIRouter()

@router.get("/laundries", response_model=LaundrySchedulesOut)
def get_my_laundries_schedules(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    statement = (
        select(
            Schedule.id, 
            Schedule.start_time, 
            Schedule.end_time,
            Laundry.room, 
            Laundry.washing_machine_number,
        )
        .join(LaundrySchedule, LaundrySchedule.schedule_id == Schedule.id)
        .join(Laundry, Laundry.id == LaundrySchedule.laundry_id)
        .where(Schedule.user_id == current_user.id)
        .offset(skip)
        .limit(limit)
    )

    results = session.exec(statement).all()

    return LaundrySchedulesOut(data=results, count=len(results))

@router.get("/public_areas", response_model=PublicAreaSchedulesOut)
def get_my_public_area_schedules(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    statement = (
        select(
            Schedule.id, 
            Schedule.start_time, 
            Schedule.end_time,
            PublicArea.name, 
            PublicArea.area_type,
        )
        .join(PublicAreaSchedule, PublicAreaSchedule.schedule_id == Schedule.id)
        .join(PublicArea, PublicArea.id == PublicAreaSchedule.public_area_id)
        .where(Schedule.user_id == current_user.id)
        .offset(skip)
        .limit(limit)
    )

    results = session.exec(statement).all()

    return PublicAreaSchedulesOut(data=results, count=len(results))

@router.delete("/laundry/{id}")
def delete_laundry_schedule(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Message:
    
    schedule = session.get(Schedule, id)

    statement = (
        select(LaundrySchedule)
        .where(LaundrySchedule.schedule_id == schedule.id)
    )

    laundry_schedule = session.exec(statement).first()

    if laundry_schedule:
        session.delete(laundry_schedule)
        session.commit()
    
    if schedule:
        session.delete(schedule)
        session.commit()
    
    return Message(message="Бронирование удалено успешно")

@router.delete("/public_area/{id}")
def delete_public_area_schedule(
    session: SessionDep, current_user: CurrentUser, id: int
) -> Message:
    
    schedule = session.get(Schedule, id)

    statement = (
        select(PublicAreaSchedule)
        .where(PublicAreaSchedule.schedule_id == schedule.id)
    )

    public_area_schedule = session.exec(statement).first()

    if public_area_schedule:
        session.delete(public_area_schedule)
        session.commit()
    
    if schedule:
        session.delete(schedule)
        session.commit()
    
    return Message(message="Бронирование удалено успешно")