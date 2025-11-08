# For future SQLAlchemy models
from sqlalchemy import Column, Integer, String, Float
from app.models.database import Base

class SalesRecord(Base):
    __tablename__ = "sales"
    id = Column(Integer, primary_key=True, index=True)
    Order_ID = Column(String)
    State = Column(String)
    City = Column(String)
    Category = Column(String)
    Sales = Column(Float)
    Profit = Column(Float)
