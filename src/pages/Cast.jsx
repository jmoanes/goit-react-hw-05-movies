import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCast, getImageUrl } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import './Cast.css';

/**
 * Cast Component
 * 
 * Displays the cast members for a specific movie with proper
 * loading states, error handling, and responsive design.
 */
const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCast = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchCast(movieId);
        setCast(data.cast || []);
      } catch (err) {
        console.error('Error loading cast:', err);
        setError(err.message || 'Failed to load cast information');
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      loadCast();
    }
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="cast-section">
        <LoadingSpinner size="medium" message="Loading cast..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="cast-section">
        <div className="error-message">
          <h3>Unable to load cast</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!cast || cast.length === 0) {
    return (
      <div className="cast-section">
        <div className="empty-state">
          <h3>No cast information available</h3>
          <p>Cast details for this movie are not available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cast-section">
      <h3 className="section-title">
        Cast
      </h3>
      <div className="cast-grid">
        {cast.slice(0, 12).map(actor => (
          <div key={actor.id} className="cast-member">
            <div className="cast-image-container">
              <img
                src={getImageUrl(actor.profile_path, 'w200')}
                alt={actor.name}
                className="cast-image"
                loading="lazy"
              />
            </div>
            <div className="cast-info">
              <h4 className="actor-name">{actor.name}</h4>
              <p className="character-name">{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
      {cast.length > 12 && (
        <p className="cast-note">
          Showing first 12 cast members. Total: {cast.length}
        </p>
      )}
    </div>
  );
};

export default Cast;
