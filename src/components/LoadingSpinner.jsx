import React from 'react'; // Import React library
import './LoadingSpinner.css'; // Import corresponding CSS file

/**
 * Loading Spinner Component
 * 
 * A reusable loading indicator component with customizable size and message.
 * Provides visual feedback during async operations.
 */
const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  className = '' 
}) => {
  return (
    <div className={`loading-container ${className}`}>
      <div className={`spinner spinner-${size}`}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
