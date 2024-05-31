import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../api';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    getRecipeById(id).then(response => setRecipe(response.data));
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="recipe-header">
        <img src="/assets/images/recipe-image.svg" alt="Recipe Image" />
        <div className="recipe-info">
          <h2>{recipe.title}</h2>
          <p>{recipe.time_required} min required</p>
          <p>{recipe.description}</p>
        </div>
      </div>
      <h3>Ingredients</h3>
      <table className="ingredients">
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {recipe.ingredients.map((ingredient, index) => (
            <tr key={index}>
              <td>{ingredient.name}</td>
              <td>{ingredient.amount} {ingredient.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Steps</h3>
      <div className="steps">
        {recipe.steps.map((step, index) => (
          <div className="step" key={index}>
            <span className="step-number">{index + 1}</span>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeDetail;
