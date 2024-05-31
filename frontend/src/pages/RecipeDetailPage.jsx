import React from 'react';
import Navbar from '../components/Navbar';
import RecipeDetail from '../components/RecipeDetail';
import Footer from '../components/Footer';

const RecipeDetailPage = () => (
  <>
    <Navbar />
    <main>
      <RecipeDetail />
    </main>
    <Footer />
  </>
);

export default RecipeDetailPage;
