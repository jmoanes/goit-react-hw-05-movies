import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar Component
 * 
 * Main navigation component with responsive design and accessibility features.
 * Provides navigation between Home and Movies pages.
 */
const Navbar = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="navbar-container">
        <div className="navbar-menu">
          <NavLink 
            to="/" 
            end 
            className="nav-link"
            aria-label="Go to Home page"
          >
            Home
          </NavLink>
          <NavLink 
            to="/movies" 
            className="nav-link"
            aria-label="Go to Movies page"
          >
            Movies
          </NavLink>
        </div>
        
        <div className="navbar-brand">
          <NavLink to="/" className="brand-link" aria-label="Home">
            <span className="brand-text">MovieDB</span>
          </NavLink>
        </div>
        
        {/* Mobile menu button for future enhancement */}
        <button 
          className="mobile-menu-button"
          aria-label="Toggle mobile menu"
          aria-expanded="false"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
