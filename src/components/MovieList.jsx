import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import './MovieList.css';

/**
 * MovieList Component
 * 
 * Displays a grid of movie cards with proper responsive layout.
 * Handles empty states and provides accessibility features.
 */
const MovieList = ({ movies, isLoading = false, error = null }) => {
  // Show loading state
  if (isLoading) {
    return (
      <div className="movie-list-container">
        <div className="movie-list-loading">
          <div className="loading-skeleton-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="movie-card-skeleton">
                <div className="skeleton-poster"></div>
                <div className="skeleton-title"></div>
                <div className="skeleton-year"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show error state 
  if (error) {
    return (
      <div className="movie-list-container">
        <div className="movie-list-error">
          <h3>Unable to load movies</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Show empty state
  if (!movies || movies.length === 0) {
    return (
      <div className="movie-list-container">
        <div className="movie-list-empty" style={{ display: 'none' }}>
          <h3>No movies found</h3>
          <p>Try adjusting your search criteria or check back later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <div className="movie-list" role="grid" aria-label="Movie collection">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

// PropTypes validation
MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string,
      vote_average: PropTypes.number,
      release_date: PropTypes.string,
    })
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default MovieList;
