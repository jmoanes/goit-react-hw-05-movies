import React, { useEffect, useState } from 'react';
import { fetchPopularMovies } from '../api';
import MovieList from '../components/MovieList'; // Reusable movie list component
import LoadingSpinner from '../components/LoadingSpinner'; // Loading indicator component
import ErrorBoundary from '../components/ErrorBoundary'; // Error boundary component
import './Home.css';

/**
 * Home Page Component
 * 
 * Displays popular movies on the homepage with proper loading states,
 * error handling, and responsive design.
 */
const Home = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchPopularMovies();
        setMovies(data.results || []);
      } catch (err) {
        console.error('Error loading popular movies:', err);
        setError(err.message || 'Failed to load popular movies');
      } finally {
        setIsLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  return (
    <ErrorBoundary>
      <div className="home-page">
        <div className="home-header">
          <h1 className="home-title">
            Popular Movies
          </h1>
          <p className="home-subtitle">
            Discover the most popular movies trending right now
          </p>
        </div>
        
        <div className="home-content">
          {isLoading ? (
            <LoadingSpinner 
              size="large" 
              message="Loading popular movies..." 
            />
          ) : (
            <MovieList 
              movies={movies} 
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default Home;
