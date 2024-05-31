import React, { useState } from 'react';
import { createRecipe } from '../api';

const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [timeRequired, setTimeRequired] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', amount: '', unit: '' }]);
  const [steps, setSteps] = useState([{ description: '' }]);

  const handleIngredientChange = (index, e) => {
    const newIngredients = [...ingredients];
    newIngredients[index][e.target.name] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index, e) => {
    const newSteps = [...steps];
    newSteps[index].description = e.target.value;
    setSteps(newSteps);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: '' }]);
  };

  const handleAddStep = () => {
    setSteps([...steps, { description: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createRecipe({
      title,
      time_required: timeRequired,
      description,
      ingredients,
      steps,
    }).then(() => {
      // Handle post-create logic
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-section">
        <div className="upload-placeholder">
          <span>Drag & Drop for Upload Image</span>
        </div>
        <div>
          <label htmlFor="recipe-title">Recipe title</label>
          <input type="text" id="recipe-title" name="recipe-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Recipe title" />

          <label htmlFor="time-required">Time required</label>
          <input type="number" id="time-required" name="time-required" value={timeRequired} onChange={(e) => setTimeRequired(e.target.value)} placeholder="0" />

          <label htmlFor="description">Description for this recipe</label>
          <textarea id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description for this recipe"></textarea>
        </div>
      </div>

      <div className="ingredients">
        <h3>Ingredients</h3>
        {ingredients.map((ingredient, index) => (
          <div className="ingredient-item" key={index}>
            <input type="text" name="name" value={ingredient.name} onChange={(e) => handleIngredientChange(index, e)} placeholder="Ingredient name" />
            <input type="number" name="amount" value={ingredient.amount} onChange={(e) => handleIngredientChange(index, e)} placeholder="0" />
            <input type="text" name="unit" value={ingredient.unit} onChange={(e) => handleIngredientChange(index, e)} placeholder="unit" />
            <button type="button" className="delete-btn" onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}>&times;</button>
          </div>
        ))}
        <button type="button" className="add-btn" onClick={handleAddIngredient}>+</button>
      </div>

      <div className="steps">
        <h3>Steps</h3>
        {steps.map((step, index) => (
          <div className="step-item" key={index}>
            <textarea name="description" value={step.description} onChange={(e) => handleStepChange(index, e)} placeholder="Description for step."></textarea>
            <button type="button" className="delete-btn" onClick={() => setSteps(steps.filter((_, i) => i !== index))}>&times;</button>
          </div>
        ))}
        <button type="button" className="add-btn" onClick={handleAddStep}>+</button>
      </div>

      <button type="submit" className="save-btn">Save</button>
    </form>
  );
};

export default RecipeForm;
