# app/models/tables.py
from sqlalchemy import Column, Integer, String, Float
from .database import Base

class Sales(Base):
    __tablename__ = "sales"

    id = Column(Integer, primary_key=True, index=True)
    row_id = Column(Integer)
    order_id = Column(String)
    order_date = Column(String)
    ship_date = Column(String)
    ship_mode = Column(String)
    customer_id = Column(String)
    customer_name = Column(String)
    segment = Column(String)
    country = Column(String)
    city = Column(String)
    state = Column(String)
    postal_code = Column(String)
    region = Column(String)
    product_id = Column(String)
    category = Column(String)
    sub_category = Column(String)
    product_name = Column(String)
    sales = Column(Float)
    quantity = Column(Integer)
    discount = Column(Float)
    profit = Column(Float)
