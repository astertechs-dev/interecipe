import React from 'react';
import Navbar from '../components/Navbar';
import RecipeList from '../components/RecipeList';
import Footer from '../components/Footer';

const Home = () => (
  <>
    <Navbar />
    <main>
      <RecipeList />
    </main>
    <Footer />
  </>
);

export default Home;
