from typing import Any

from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep, get_current_technical_staff
from app.models.issue import (
    Issue,
    IssueCreate,
    IssueOut,
    IssuesOut,
    IssueUpdate,
    TechnicalIssuesOut,
    IStatusEnum,
    IssueDetails
)
from app.models.user import User
from app.models.common import Message

router = APIRouter()

@router.get("/",
    dependencies=[Depends(get_current_technical_staff)],
    response_model=TechnicalIssuesOut
)
def read_technical_issues(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    
    statement = (
        select(
            User.full_name,
            User.email,
            Issue.issue_type,
            Issue.status,
            Issue.id
        )
        .join(Issue, Issue.user_id == User.id)
        .offset(skip)
        .limit(limit)
    )

    result = session.exec(statement).all()

    return TechnicalIssuesOut(data=result, count=len(result))

@router.patch("/{issue_id}")
def change_status(
    *,
    session: SessionDep,
    issue_id: int,
    new_status: IStatusEnum,
) -> Any:
    
    db_issue = session.get(Issue, issue_id)
    if not db_issue:
        raise HTTPException(status_code=409)
    
    db_issue.status = new_status

    session.add(db_issue)
    session.commit()
    session.refresh(db_issue)

    return db_issue

@router.get("/{issue_id}/details", response_model=IssueDetails)
def get_details(
    session: SessionDep,
    issue_id: int,
) -> Any:
    
    issue = session.get(Issue, issue_id)

    return IssueDetails(location=issue.location, description=issue.description)