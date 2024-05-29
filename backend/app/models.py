from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base

class Recipe(Base):
    __tablename__ = "recipes"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    time_required = Column(Integer)
    description = Column(Text)
    image_url = Column(String, nullable=True)
    
    ingredients = relationship("Ingredient", back_populates="recipe")
    steps = relationship("Step", back_populates="recipe")

class Ingredient(Base):
    __tablename__ = "ingredients"
    id = Column(Integer, primary_key=True, index=True)
    recipe_id = Column(Integer, ForeignKey("recipes.id"))
    name = Column(String)
    amount = Column(Float)
    unit = Column(String)

    recipe = relationship("Recipe", back_populates="ingredients")

class Step(Base):
    __tablename__ = "steps"
    id = Column(Integer, primary_key=True, index=True)
    recipe_id = Column(Integer, ForeignKey("recipes.id"))
    description = Column(Text)
    step_number = Column(Integer)

    recipe = relationship("Recipe", back_populates="steps")
