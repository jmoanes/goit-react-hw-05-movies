import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviews } from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import './Reviews.css';

/**
 * Reviews Component
 * 
 * Displays movie reviews with proper loading states, error handling,
 * and responsive design. Includes review rating and content formatting.
 */
const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchReviews(movieId);
        setReviews(data.results || []);
      } catch (err) {
        console.error('Error loading reviews:', err);
        setError(err.message || 'Failed to load reviews');
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      loadReviews();
    }
  }, [movieId]);

  // Format review date
  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown date';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Truncate long content
  const truncateContent = (content, maxLength = 500) => {
    if (!content) return '';
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  if (isLoading) {
    return (
      <div className="reviews-section">
        <LoadingSpinner size="medium" message="Loading reviews..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="reviews-section">
        <div className="error-message">
          <h3>Unable to load reviews</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="reviews-section">
        <div className="empty-state">
          <h3>No reviews available</h3>
          <p>There are no reviews for this movie at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reviews-section">
      <h3 className="section-title">
        Reviews ({reviews.length})
      </h3>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <div className="review-author">
                <div className="author-avatar">
                  {review.author.charAt(0).toUpperCase()}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{review.author}</h4>
                  <span className="review-date">{formatDate(review.created_at)}</span>
                </div>
              </div>
              {review.author_details && review.author_details.rating && (
                <div className="review-rating">
                  <span className="rating-icon">⭐</span>
                  <span className="rating-value">{review.author_details.rating}/10</span>
                </div>
              )}
            </div>
            
            <div className="review-content">
              <p>{truncateContent(review.content)}</p>
              {review.content && review.content.length > 500 && (
                <button className="read-more-btn">
                  Read More
                </button>
              )}
            </div>
            
            {review.url && (
              <div className="review-footer">
                <a 
                  href={review.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="review-link"
                >
                  Read full review on TMDB →
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
