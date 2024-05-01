from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models.laundry import Laundry, LaundryCreate, LaundryOut, LaundriesOut, LaundryUpdate
from app.models.common import Message


router = APIRouter()

@router.get("/", response_model=LaundriesOut)
def read_laundries(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve laundries.
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