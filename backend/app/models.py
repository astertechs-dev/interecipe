from sqlalchemy import Column, Integer, String, ForeignKey, Float, Text
from sqlalchemy.orm import relationship
from .database import Base

class Recipe(Base):
    __tablename__ = 'recipes'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    image_url = Column(String(255))
    description = Column(Text)
    time = Column(Integer)

    ingredients = relationship("RecipeIngredient", back_populates="recipe")
    steps = relationship("Step", back_populates="recipe")


class Ingredient(Base):
    __tablename__ = 'ingredients'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)


class RecipeIngredient(Base):
    __tablename__ = 'recipe_ingredients'

    id = Column(Integer, primary_key=True, index=True)
    recipe_id = Column(Integer, ForeignKey('recipes.id'))
    ingredient_id = Column(Integer, ForeignKey('ingredients.id'))
    quantity = Column(Float)
    unit = Column(String(50))

    recipe = relationship("Recipe", back_populates="ingredients")
    ingredient = relationship("Ingredient")


class Step(Base):
    __tablename__ = 'steps'

    id = Column(Integer, primary_key=True, index=True)
    recipe_id = Column(Integer, ForeignKey('recipes.id'))
    order = Column(Integer)
    description = Column(Text)

    recipe = relationship("Recipe", back_populates="steps")
