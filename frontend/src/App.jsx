import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import RecipeDetailPage from './pages/RecipeDetailPage';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes/new" element={<AddRecipe />} />
      <Route path="/recipes/:id" element={<RecipeDetailPage />} />
    </Routes>
  </Router>
);

export default App;
