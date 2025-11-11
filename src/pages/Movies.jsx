import React, { useState, useEffect, useCallback } from 'react';
import { searchMovies } from '../api';
import MovieList from '../components/MovieList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import './Movies.css';

/**
 * Movies Page Component
 * 
 * Provides movie search functionality with debounced input,
 * proper loading states, and error handling.
 */
const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (!searchQuery.trim()) {
        setMovies([]);
        setHasSearched(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const data = await searchMovies(searchQuery.trim());
        setMovies(data.results || []);
        setHasSearched(true);
      } catch (err) {
        console.error('Error searching movies:', err);
        setError(err.message || 'Failed to search movies');
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  // Effect to trigger search when query changes
  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Handle manual search (for form submission)
  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      debouncedSearch(query);
    }
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setMovies([]);
    setError(null);
    setHasSearched(false);
  };

  return (
    <ErrorBoundary>
      <div className="movies-page">
        <div className="movies-header">
          <h1 className="movies-title">
            Search Movies
          </h1>
          <p className="movies-subtitle">
            Find your favorite movies and discover new ones
          </p>
        </div>

        <div className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-container">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter movie title..."
                className="search-input"
                aria-label="Search for movies"
                autoComplete="off"
              />
              {query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="clear-button"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
              <button 
                type="submit" 
                className="search-button"
                disabled={!query.trim() || isLoading}
                aria-label="Search movies"
              >
                {isLoading ? (
                  <div className="button-spinner"></div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="movies-content">
          {isLoading ? (
            <LoadingSpinner 
              size="large" 
              message="Searching movies..." 
            />
          ) : (
            <MovieList 
              movies={movies} 
              isLoading={isLoading}
              error={error}
            />
          )}
          
          {!hasSearched && !isLoading && !error && (
            <div className="search-prompt">
              <h3>Start Your Search</h3>
              <p>Enter a movie title above to begin searching</p>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Movies;
