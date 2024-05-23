import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';
import ErrorPage from './components/ErrorPage';
import RecipeList from './components/RecipeList';
import RecipeCreate from './components/RecipeCreate';
import RecipeDetail from './components/RecipeDetail';

const App = () => {
  return (
    <>
      <NavigationBar />
      <main>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/create" element={<RecipeCreate />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/error/:errorCode" element={<ErrorPage />} />
          {/* React Router v6では、catch-all routesは "*" を使用します */}
          <Route path="*" element={<ErrorPage errorCode="404" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
