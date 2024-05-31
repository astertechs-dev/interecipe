import React from 'react';
import { Link } from 'react-router-dom';
import BrandIcon from '../assets/images/cook-icon.png';

const Navbar = () => (
  <nav className="navbar">
    <div className="container">
      <div className="brand">
        <img src={BrandIcon} alt="Interecipe Logo" className="logo" />
        <h1>Interecipe</h1>
      </div>
      <Link to="/recipes/new" className="new-recipe-btn">+ New</Link>
    </div>
  </nav>
);

export default Navbar;
