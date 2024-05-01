from enum import Enum
from sqlmodel import Field, Relationship, SQLModel, Column, String
from sqlalchemy_utils import ChoiceType


class AreaEnum(str, Enum):
    sport = "sport"
    dancing = "dancing"
    gaming = "gaming"
    other = "other"


class PublicAreaBase(SQLModel):
    name: str
    description: str
    capacity: int = Field(ge=1)

    area_type: AreaEnum | None = Field(
        default=AreaEnum.other,
        sa_column=Column(ChoiceType(AreaEnum, impl=String())),
    )

class PublicAreaCreate(PublicAreaBase):
    pass

class PublicAreaUpdate(PublicAreaBase):
    name: str | None = None
    description: str | None = None
    capacity: int | None = None
    area_type: AreaEnum | None = None

class PublicArea(PublicAreaBase, table=True):
    __tablename__ = "public_area"
    
    id: int | None = Field(default=None, primary_key=True)
    
class PublicAreaOut(PublicAreaBase):
    id: int

class PublicAreasOut(SQLModel):
    data: list[PublicAreaOut]
    count: int