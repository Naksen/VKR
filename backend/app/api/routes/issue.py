from typing import Any

from fastapi import APIRouter, HTTPException
from sqlmodel import func, select

from app.api.deps import CurrentUser, SessionDep
from app.models.issue import (
    Issue,
    IssueCreate,
    IssueOut,
    IssuesOut,
    IssueUpdate
)
from app.models.common import Message


router = APIRouter()


@router.get("/", response_model=IssuesOut)
def read_issues(
    session: SessionDep, current_user: CurrentUser, skip: int = 0, limit: int = 100
) -> Any:
    """
    Retrieve issues.
    """

    if current_user.is_superuser:
        count_statement = select(func.count()).select_from(Issue)
        count = session.exec(count_statement).one()
        statement = select(Issue).offset(skip).limit(limit)
        issues = session.exec(statement).all()
    else:
        count_statement = (
            select(func.count())
            .select_from(Issue)
            .where(Issue.user_id == current_user.id)
        )
        count = session.exec(count_statement).one()
        statement = (
            select(Issue)
            .where(Issue.user_id == current_user.id)
            .offset(skip)
            .limit(limit)
        )
        issues = session.exec(statement).all()

    return IssuesOut(data=issues, count=count)

@router.get("/{id}", response_model=IssueOut)
def read_issue(session: SessionDep, current_user: CurrentUser, id: int) -> Any:
    """
    Get issue by ID.
    """
    issue = session.get(Issue, id)
    if not issue:
        raise HTTPException(status_code=404, detail="Item not found")
    if not current_user.is_superuser and (issue.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return issue

@router.post("/", response_model=IssueOut)
def create_issue(
    *, session: SessionDep, current_user: CurrentUser, issue_in: IssueCreate
) -> Any:
    """
    Create new issue.
    """
    issue = Issue.model_validate(issue_in, update={"user_id": current_user.id})
    session.add(issue)
    session.commit()
    session.refresh(issue)
    return issue


@router.put("/{id}", response_model=IssueOut)
def update_issue(
    *, session: SessionDep, current_user: CurrentUser, id: int, issue_in: IssueUpdate
) -> Any:
    """
    Update an issue.
    """
    issue = session.get(Issue, id)
    if not issue:
        raise HTTPException(status_code=404, detail="Item not found")
    if not current_user.is_superuser and (issue.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    update_dict = issue_in.model_dump(exclude_unset=True)
    issue.sqlmodel_update(update_dict)
    session.add(issue)
    session.commit()
    session.refresh(issue)
    return issue

@router.delete("/{id}")
def delete_issue(session: SessionDep, current_user: CurrentUser, id: int) -> Message:
    """
    Delete an issue.
    """
    issue = session.get(Issue, id)
    if not issue:
        raise HTTPException(status_code=404, detail="Item not found")
    if not current_user.is_superuser and (issue.user_id != current_user.id):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    session.delete(issue)
    session.commit()
    return Message(message="Item deleted successfully")


