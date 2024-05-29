from pydantic import BaseModel
from typing import List

class Ingredient(BaseModel):
    name: str
    amount: float
    unit: str

class Step(BaseModel):
    description: str
    step_number: int

class RecipeCreate(BaseModel):
    title: str
    time_required: int
    description: str
    ingredients: List[Ingredient]
    steps: List[Step]

class RecipeUpdate(RecipeCreate):
    pass

class Recipe(BaseModel):
    id: int
    title: str
    time_required: int
    description: str
    ingredients: List[Ingredient]
    steps: List[Step]

    class Config:
        orm_mode = True
