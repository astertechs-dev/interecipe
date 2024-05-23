from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from .database import SessionLocal, engine
from .models import Base, Recipe, RecipeIngredient, Step
from .schemas import RecipeCreate, Recipe, Step

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/api/recipes/", response_model=Recipe)
def create_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = Recipe(
        name=recipe.name,
        image_url=recipe.image_url,
        description=recipe.description,
        time=recipe.time
    )
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    for ingredient in recipe.ingredients:
        db_ingredient = RecipeIngredient(
            recipe_id=db_recipe.id,
            ingredient_id=ingredient.ingredient_id,
            quantity=ingredient.quantity,
            unit=ingredient.unit
        )
        db.add(db_ingredient)
    for step in recipe.steps:
        db_step = Step(
            recipe_id=db_recipe.id,
            order=step.order,
            description=step.description
        )
        db.add(db_step)
    db.commit()
    return db_recipe

@app.get("/api/recipes/", response_model=List[Recipe])
def read_recipes(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    recipes = db.query(Recipe).offset(skip).limit(limit).all()
    return recipes

@app.get("/api/recipes/{recipe_id}", response_model=Recipe)
def read_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@app.put("/api/recipes/{recipe_id}", response_model=Recipe)
def update_recipe(recipe_id: int, recipe: RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db_recipe.name = recipe.name
    db_recipe.image_url = recipe.image_url
    db_recipe.description = recipe.description
    db_recipe.time = recipe.time
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

@app.delete("/api/recipes/{recipe_id}", response_model=Recipe)
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    db_recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if db_recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db.delete(db_recipe)
    db.commit()
    return db_recipe
