import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Cast from './pages/Cast';
import Reviews from './pages/Reviews';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';


//  Main App Component
 
const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState(() => {
    //  Load from localStorage on first render
    const stored = localStorage.getItem('favoriteMovies');
    return stored ? JSON.parse(stored) : [];
  });

  // Save current route to localStorage

  useEffect(() => {
    localStorage.setItem('lastVisitedPage', location.pathname);
  }, [location]);

  // Restore last visited route on app start

  useEffect(() => {
    const lastPage = localStorage.getItem('lastVisitedPage');
    // Only navigate if we have a stored page and it's different from current
    // Also ensure we don't navigate to invalid paths
    if (lastPage && lastPage !== location.pathname && lastPage.startsWith('/')) {
      navigate(lastPage, { replace: true });
    }
  }, []); // run once on mount

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
  }, [favorites]);

  //  Add or remove movie from favorites
  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === movie.id);
      if (exists) {
        return prev.filter((fav) => fav.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <Navbar favorites={favorites} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/movies"
              element={<Movies favorites={favorites} toggleFavorite={toggleFavorite} />}
            />
            <Route
              path="/movies/:movieId"
              element={<MovieDetails toggleFavorite={toggleFavorite} favorites={favorites} />}
            >
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
