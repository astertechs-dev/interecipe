from pydantic import BaseModel
from typing import List, Optional

class StepBase(BaseModel):
    order: int
    description: str

class StepCreate(StepBase):
    pass

class Step(StepBase):
    id: int
    recipe_id: int

    class Config:
        from_attributes = True

class IngredientBase(BaseModel):
    name: str

class IngredientCreate(IngredientBase):
    pass

class Ingredient(IngredientBase):
    id: int

    class Config:
        from_attributes = True

class RecipeIngredientBase(BaseModel):
    ingredient_id: int
    quantity: float
    unit: str

class RecipeIngredientCreate(RecipeIngredientBase):
    pass

class RecipeIngredient(RecipeIngredientBase):
    id: int
    recipe_id: int

    class Config:
        from_attributes = True

class RecipeBase(BaseModel):
    name: str
    image_url: Optional[str] = None
    description: Optional[str] = None
    time: int

class RecipeCreate(RecipeBase):
    ingredients: List[RecipeIngredientCreate]
    steps: List[StepCreate]

class Recipe(RecipeBase):
    id: int
    ingredients: List[RecipeIngredient] = []
    steps: List[Step] = []

    class Config:
        from_attributes = True
