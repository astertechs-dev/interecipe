import React, { useEffect, useState } from 'react';
import { getRecipes } from '../api';
import RecipeItem from './RecipeItem';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes().then(response => setRecipes(response.data));
  }, []);

  return (
    <div className="container">
      <h2>Recipe List</h2>
      <div className="recipe-list">
        {recipes.map(recipe => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
