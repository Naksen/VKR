from typing import Any

from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import func, select, Session

from app.api.deps import (
    CurrentUser, 
    SessionDep,
    get_current_active_superuser
)
from app.models.public_area import (
    PublicArea,
    PublicAreaCreate,
    PublicAreaOut,
    PublicAreasOut,
    PublicAreaUpdate
)
from app.models.schedule import (
    Schedule,
    ScheduleCreate,
    SchedulesOut,
    ScheduleOut,
    ScheduleUpdate
)
from app.models.public_area_schedule import PublicAreaSchedule
from app.models.common import Message

def schedule_is_allowed(
    new_schedule: ScheduleCreate,
    public_area_id: int,
    session: Session 
) -> bool:
    public_area_schedules: list[PublicAreaSchedule] = session.execute(
        select(PublicAreaSchedule)
        .where(PublicAreaSchedule.public_area_id == public_area_id)
    ).scalars().all()
    if public_area_schedules:
        schedules_ids = [public_area_schedule.schedule_id for public_area_schedule in public_area_schedules]
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


@router.get("/", response_model=PublicAreasOut)
def read_public_areas(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve public areas.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(PublicArea)
        count = session.exec(count_statement).one()
        statement = select(PublicArea).offset(skip).limit(limit)
        public_areas = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(PublicArea)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(PublicArea)
            .offset(skip)
            .limit(limit)
        )
        public_areas = session.exec(statement).all()

    return PublicAreasOut(data=public_areas, count=count)

@router.get("/{id}", response_model=PublicAreaOut)
def read_public_area(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    """
    Get public_area by ID.
    """
    public_area = session.get(PublicArea, id)
    if not public_area:
        raise HTTPException(status_code=404, detail="Public area not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return public_area

@router.post(
    "/",
    response_model=PublicAreaOut
)
def create_public_area(
    *, session: SessionDep, current_user: CurrentUser, public_area_in: PublicAreaCreate
) -> Any:
    """
    Create new public area.
    """
    public_area = PublicArea.model_validate(public_area_in)
    session.add(public_area)
    session.commit()
    session.refresh(public_area)
    return public_area

@router.put(
    "/{id}",
    response_model = PublicAreaOut
)
def update_public_area(
    *, session: SessionDep, current_user: CurrentUser, id: int, public_area_in: PublicAreaUpdate
) -> Any:
    """
    Update a public area
    """
    public_area = session.get(PublicArea, id)
    if not public_area:
        raise HTTPException(status_code=404, detail="Public area not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = public_area_in.model_dump(exclude_unset=True)
    public_area.sqlmodel_update(update_dict)
    session.add(public_area)
    session.commit()
    session.refresh(public_area)
    return public_area

@router.delete("/{id}")
def delete_public_area(session: SessionDep, current_user: CurrentUser, id: int) -> Message:
    """
    Delete a public area.
    """
    public_area = session.get(PublicArea, id)
    if not public_area:
        raise HTTPException(status_code=404, detail="Public area not found")
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(public_area)
    session.commit()
    return Message(message="Public area deleted successfully")


@router.post("/{id}/reserve")
def reserve_public_area(
    schedule_in: ScheduleCreate,
    session: SessionDep, 
    current_user: CurrentUser, 
    id: int
) -> Message:
    """
    Reserve a public area.
    """

    public_area = session.get(PublicArea, id)
    if not public_area:
        raise HTTPException(status_code=404, detail="Public area not found")
    
    is_allowed = schedule_is_allowed(
        new_schedule=schedule_in,
        public_area_id=id,
        session=session
    )
    if not is_allowed:
        raise HTTPException(status_code=400, detail="New schedule is not allowed")
    
    current_schedule = Schedule.model_validate(schedule_in)
    session.add(current_schedule)
    session.commit()
    session.refresh(current_schedule)

    current_public_area_schedule = PublicAreaSchedule(
        public_area_id=id,
        schedule_id=current_schedule.id
    )
    session.add(current_public_area_schedule)
    session.commit()
    session.refresh(current_public_area_schedule)

    return Message(message="Public area reserved successfully")