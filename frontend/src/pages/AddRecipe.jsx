import React from 'react';
import Navbar from '../components/Navbar';
import RecipeForm from '../components/RecipeForm';
import Footer from '../components/Footer';

const AddRecipe = () => (
  <>
    <Navbar />
    <main>
      <div className="container">
        <h2>Add New Recipe</h2>
        <RecipeForm />
      </div>
    </main>
    <Footer />
  </>
);

export default AddRecipe;
