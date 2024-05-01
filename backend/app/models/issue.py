from typing import TYPE_CHECKING
from sqlmodel import Field, Relationship, SQLModel, Column, String
from datetime import datetime
from enum import Enum
from sqlalchemy_utils import ChoiceType

from app.models.user import User

class IIssueType(str, Enum):
    plumbing = "plumbing"
    electrics = "electrics"
    heating = "heating"
    furniture = "furniture"
    other = "other"

class IStatusEnum(str, Enum):
    new = "new"
    in_progress = "in_progress"
    completed = "completed"
    closed = "closed"

class IssueBase(SQLModel):
    issue_type: IIssueType = Field(
        default=IIssueType.other,
        sa_column=Column(ChoiceType(IIssueType, impl=String())),
    )
    status: IStatusEnum = Field(
        default=IStatusEnum.new,
        sa_column=Column(ChoiceType(IStatusEnum, impl=String())),
    )
    location: str
    description: str

class IssueCreate(IssueBase):
    pass

class IssueUpdate(IssueBase):
    issue_type: IIssueType | None = None
    status: IStatusEnum | None = None
    location: str | None = None
    description: str | None = None

class Issue(IssueBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    user_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    created_at: datetime | None = Field(default_factory=datetime.utcnow)

class IssueOut(IssueBase):
    id: int
    user_id: int
    created_at: datetime

class IssuesOut(SQLModel):
    data: list[IssueOut]
    count: int