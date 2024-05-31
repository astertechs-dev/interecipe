import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteRecipe } from '../api';

import TrashIcon from '../assets/images/trashbox.png';
import DummyImage from '../assets/images/dummy.jpg';

const RecipeItem = ({ recipe }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipe.id).then(() => {
      navigate('/');
    });
  };

  const handleImageError = (e) => {
    e.target.src = DummyImage;
  };

  return (
    <div className="recipe-item">
      <img src={recipe.image_url || DummyImage} alt="Recipe Image" onError={handleImageError} />
      <Link to={`/recipes/${recipe.id}`} className="recipe-content">
        <div className="recipe-header">
          <h3 className="recipe-title">{recipe.title}</h3>
          <div className="recipe-meta">
            <span className="time">{recipe.time_required} min</span>
          </div>
        </div>
        <p className="recipe-description">{recipe.description}</p>
      </Link>
      <button className="delete-btn" onClick={handleDelete}>
        <img src={TrashIcon} alt="Delete" />
      </button>
    </div>
  );
};

export default RecipeItem;