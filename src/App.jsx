import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Cast from './pages/Cast';
import Reviews from './pages/Reviews';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

/**
 * Main App Component
 * 
 * Root component that sets up routing and provides the main application structure.
 * Includes error boundaries for better error handling and user experience.
 */
const App = () => {
  return (
    <ErrorBoundary>
      <div className="app">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default App;
