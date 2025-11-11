import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getImageUrl, formatRating } from '../api';
import './MovieCard.css';

// MovieCard Component
 
 const MovieCard = ({ movie }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Handle image load error
  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  // Handle successful image load
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Get the appropriate image source
  const getImageSource = () => {
    if (imageError || !movie.poster_path) {
      return '/placeholder-movie.svg';
    }
    return getImageUrl(movie.poster_path, 'w300');
  };

  return (
    <div className="movie-card" role="article" aria-label={`Movie: ${movie.title}`}>
      <Link 
        to={`/movies/${movie.id}`} 
        className="movie-card-link"
        aria-label={`View details for ${movie.title}`}
      >
        <div className="movie-poster-container">
          {imageLoading && !imageError && (
            <div className="image-loading-placeholder">
              <div className="loading-skeleton"></div>
            </div>
          )}
          <img
            src={getImageSource()}
            alt={movie.poster_path ? movie.title : `${movie.title} - No poster available`}
            className={`movie-poster ${imageLoading ? 'loading' : ''}`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
          <div className="movie-overlay">
            <div className="movie-info">
              <h3 className="movie-title" title={movie.title}>
                {movie.title}
              </h3>
              {movie.release_date && (
                <p className="movie-year">
                  {new Date(movie.release_date).getFullYear()}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

// PropTypes validation
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
  }).isRequired,
};

export default MovieCard;
