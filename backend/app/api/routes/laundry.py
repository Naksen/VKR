from typing import Any
import datetime
from fastapi import APIRouter, HTTPException
from sqlmodel import func, select, Session

from app.api.deps import CurrentUser, SessionDep
from app.models.laundry import Laundry, LaundryCreate, LaundryOut, LaundriesOut, LaundryUpdate
from app.models.schedule import (
    Schedule,
    ScheduleCreate,
    SchedulesOut,
    ScheduleOut,
    ScheduleUpdate
)
from app.models.laundry_schedules import LaundrySchedule
from app.models.common import Message

def schedule_is_allowed(
    new_schedule: ScheduleCreate,
    laundry_id: int,
    session: Session 
) -> bool:
    laundry_schedules: list[LaundrySchedule] = session.execute(
        select(LaundrySchedule)
        .where(LaundrySchedule.laundry_id == laundry_id)
    ).scalars().all()
    if laundry_schedules:
        schedules_ids = [laundry_schedule.schedule_id for laundry_schedule in laundry_schedules]
        schedules: list[Schedule] = session.execute(
            select(Schedule)
            .where(Schedule.id.in_(schedules_ids))
        ).scalars().all()
        for schedule in schedules:
            if not schedule.is_allowed(
                new_start_time=new_schedule.start_time,
                new_end_time=new_schedule.end_time
            ):
                return False
    return True

router = APIRouter()

@router.get("/", response_model=LaundriesOut)
def read_laundries(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Получить постирочные.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(Laundry)
        count = session.exec(count_statement).one()
        statement = select(Laundry).offset(skip).limit(limit)
        laundries = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(Laundry)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(Laundry)
            .offset(skip)
            .limit(limit)
        )
        laundries = session.exec(statement).all()

    return LaundriesOut(data=laundries, count=count)

@router.get("/{id}", response_model=LaundryOut)
def read_laundry(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    """
    Get laundry by ID.
    """
    laundry = session.get(Laundry, id)
    if not laundry:
        raise HTTPException(status_code=404, detail="Laundry not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return laundry

@router.post("/", response_model=LaundryOut)
def create_laundry(
    *, session: SessionDep, current_user: CurrentUser, laundry_in: LaundryCreate
) -> Any:
    """
    Create new laundry.
    """
    laundry = Laundry.model_validate(laundry_in)
    session.add(laundry)
    session.commit()
    session.refresh(laundry)
    return laundry

@router.put("/{id}", response_model=LaundryOut)
def update_laundry(
    *, session: SessionDep, current_user: CurrentUser, id: int, laundry_in: LaundryUpdate
) -> Any:
    laundry = session.get(Laundry, id)
    if not laundry:
        raise HTTPException(status_code=404, detail="Laundry not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = laundry_in.model_dump(exclude_unset=True)
    laundry.sqlmodel_update(update_dict)
    session.add(laundry)
    session.commit()
    session.refresh(laundry)
    return laundry

@router.delete("/{id}")
def delete_laundry(session: SessionDep, current_user: CurrentUser, id: int) -> Message:
    """
    Delete an laundry.
    """
    laundry = session.get(Laundry, id)
    if not laundry:
        raise HTTPException(status_code=404, detail="Laundry not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(laundry)
    session.commit()
    return Message(message="Laundry deleted successfully")

@router.get("/{id}/schedules", response_model=SchedulesOut)
def get_laundry_schedules(session: SessionDep, current_user: CurrentUser, id: int) -> Any:

    laundry = session.get(Laundry, id)
    if not laundry:
        raise HTTPException(status_code=404, detail="Laundry not found")
    
    statement = (
        select(Schedule)
        .join(LaundrySchedule, LaundrySchedule.schedule_id == Schedule.id)
        .where(LaundrySchedule.laundry_id == id)
        .where(Schedule.start_time > datetime.datetime.now())
    )

    schedules = session.exec(statement).all()

    return SchedulesOut(data=schedules, count=len(schedules))

@router.post("/{id}/reserve")
def reserve_laundry(
    schedule_in: ScheduleCreate,
    session: SessionDep, 
    current_user: CurrentUser, 
    id: int
) -> Message:

    laundry = session.get(Laundry, id)
    if not laundry:
        raise HTTPException(status_code=404, detail="Laundry not found")
    
    is_allowed = schedule_is_allowed(
        new_schedule=schedule_in,
        laundry_id=id,
        session=session
    )
    if not is_allowed:
        raise HTTPException(status_code=400, detail="New schedule is not allowed")
    
    current_schedule = Schedule(
        start_time=schedule_in.start_time,
        end_time=schedule_in.end_time,
        user_id=current_user.id
    )
    session.add(current_schedule)
    session.commit()
    session.refresh(current_schedule)

    current_laundry_schedule = LaundrySchedule(
        laundry_id=id,
        schedule_id=current_schedule.id
    )
    session.add(current_laundry_schedule)
    session.commit()
    session.refresh(current_laundry_schedule)

    return Message(message="Laundry reserved successfully")