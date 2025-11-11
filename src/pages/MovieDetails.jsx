import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, getImageUrl, formatRating } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';
import './MovieDetails.css';

/**
 * MovieDetails Page Component
 * 
 * Displays detailed information about a specific movie including
 * poster, overview, rating, and navigation to cast and reviews.
 */
const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovieDetails = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error('Error loading movie details:', err);
        setError(err.message || 'Failed to load movie details');
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      loadMovieDetails();
    }
  }, [movieId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="movie-details-page">
        <LoadingSpinner size="large" message="Loading movie details..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-details-page">
        <div className="error-state">
          <h2>Unable to load movie details</h2>
          <p>{error}</p>
          <button onClick={handleGoBack} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-details-page">
        <div className="error-state">
          <h2>Movie not found</h2>
          <p>The movie you're looking for doesn't exist.</p>
          <button onClick={handleGoBack} className="back-button">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="movie-details-page">
        <div className="movie-details">
          <button onClick={handleGoBack} className="back-button">
            ← Back
          </button>
          
          <div className="movie-content">
            <div className="movie-poster-section">
              <img 
                src={getImageUrl(movie.poster_path, 'w500')} 
                alt={movie.title}
                className="movie-poster"
                loading="lazy"
              />
            </div>
            
            <div className="movie-info">
              <h1 className="movie-title">{movie.title}</h1>
              
              {movie.tagline && (
                <p className="movie-tagline">"{movie.tagline}"</p>
              )}
              
              <div className="movie-meta">
                <div className="rating">
                  <span className="rating-icon">⭐</span>
                  <span className="rating-value">{formatRating(movie.vote_average)}</span>
                  <span className="rating-count">({movie.vote_count} votes)</span>
                </div>
                
                {movie.release_date && (
                  <div className="release-date">
                    <strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString()}
                  </div>
                )}
                
                {movie.runtime && (
                  <div className="runtime">
                    <strong>Runtime:</strong> {movie.runtime} minutes
                  </div>
                )}
                
                {movie.genres && movie.genres.length > 0 && (
                  <div className="genres">
                    <strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}
                  </div>
                )}
              </div>
              
              <div className="movie-overview">
                <h3>Overview</h3>
                <p>{movie.overview || 'No overview available.'}</p>
              </div>
              
              <div className="details-navigation">
                <Link to="cast" className="nav-button cast-button">
                  Cast
                </Link>
                <Link to="reviews" className="nav-button reviews-button">
                  Reviews
                </Link>
              </div>
            </div>
          </div>
          
          <div className="details-outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default MovieDetails;
