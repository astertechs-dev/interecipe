from sqlalchemy.orm import Session
from . import models, schemas


def get_recipes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Recipe).order_by(models.Recipe.id).offset(skip).limit(limit).all()


def get_recipe(db: Session, recipe_id: int):
    return db.query(models.Recipe).filter(models.Recipe.id == recipe_id).first()


def create_recipe(db: Session, recipe: schemas.RecipeCreate):
    db_recipe = models.Recipe(title=recipe.title, time_required=recipe.time_required, description=recipe.description)
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    
    for ingredient in recipe.ingredients:
        db_ingredient = models.Ingredient(name=ingredient.name, amount=ingredient.amount, unit=ingredient.unit, recipe_id=db_recipe.id)
        db.add(db_ingredient)
    
    for step in recipe.steps:
        db_step = models.Step(description=step.description, step_number=step.step_number, recipe_id=db_recipe.id)
        db.add(db_step)
    
    db.commit()
    db.refresh(db_recipe)
    return db_recipe


def update_recipe(db: Session, recipe: schemas.RecipeUpdate, recipe_id: int):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.id == recipe_id).first()
    if db_recipe is None:
        return None
    
    db_recipe.title = recipe.title
    db_recipe.time_required = recipe.time_required
    db_recipe.description = recipe.description
    
    db.query(models.Ingredient).filter(models.Ingredient.recipe_id == recipe_id).delete()
    db.query(models.Step).filter(models.Step.recipe_id == recipe_id).delete()
    
    for ingredient in recipe.ingredients:
        db_ingredient = models.Ingredient(name=ingredient.name, amount=ingredient.amount, unit=ingredient.unit, recipe_id=db_recipe.id)
        db.add(db_ingredient)
    
    for step in recipe.steps:
        db_step = models.Step(description=step.description, step_number=step.step_number, recipe_id=db_recipe.id)
        db.add(db_step)
    
    db.commit()
    db.refresh(db_recipe)
    return db_recipe


def delete_recipe(db: Session, recipe_id: int):
    db_recipe = db.query(models.Recipe).filter(models.Recipe.id == recipe_id).first()
    if db_recipe:
        db.query(models.Ingredient).filter(models.Ingredient.recipe_id == recipe_id).delete()
        db.query(models.Step).filter(models.Step.recipe_id == recipe_id).delete()
        db.delete(db_recipe)
        db.commit()