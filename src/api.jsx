
//  TMDB API Configuration and Service Functions 

// API Configuration
const API_KEY = 'da723509c4378165545cfe968b843f21';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Request configuration
const defaultHeaders = {
  'Content-Type': 'application/json',
};

/**
 * Generic API request handler with error handling
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - Parsed JSON response
 * @throws {Error} - If request fails or response is not ok
 */
const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: defaultHeaders,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request error:', error);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
};

/**
 * Fetch popular movies for the home page
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<Object>} - Popular movies data
 */
export const fetchPopularMovies = async (page = 1) => {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
  return apiRequest(url);
};

/**
 * Search movies by keyword
 * @param {string} query - Search query
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<Object>} - Search results data
 */
export const searchMovies = async (query, page = 1) => {
  if (!query || query.trim() === '') {
    throw new Error('Search query cannot be empty');
  }
  
  const encodedQuery = encodeURIComponent(query.trim());
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodedQuery}&page=${page}`;
  return apiRequest(url);
};

/**
 * Fetch detailed information for a specific movie
 * @param {string|number} id - Movie ID
 * @returns {Promise<Object>} - Movie details data
 */
export const fetchMovieDetails = async (id) => {
  if (!id) {
    throw new Error('Movie ID is required');
  }
  
  const url = `${BASE_URL}/movie/${id}?api_key=${API_KEY}`;
  return apiRequest(url);
};

/**
 * Fetch cast information for a specific movie
 * @param {string|number} id - Movie ID
 * @returns {Promise<Object>} - Cast data
 */
export const fetchCast = async (id) => {
  if (!id) {
    throw new Error('Movie ID is required');
  }
  
  const url = `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`;
  return apiRequest(url);
};

/**
 * Fetch reviews for a specific movie
 * @param {string|number} id - Movie ID
 * @param {number} page - Page number for pagination (default: 1)
 * @returns {Promise<Object>} - Reviews data
 */
export const fetchReviews = async (id, page = 1) => {
  if (!id) {
    throw new Error('Movie ID is required');
  }
  
  const url = `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}&page=${page}`;
  return apiRequest(url);
};

/**
 * Utility function to get image URL with specified size
 * @param {string} path - Image path from TMDB
 * @param {string} size - Image size (w200, w300, w500, original)
 * @returns {string} - Complete image URL
 */
export const getImageUrl = (path, size = 'w300') => {
  if (!path) {
    return '/placeholder-movie.svg'; // Fallback image
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

/**
 * Utility function to format movie rating
 * @param {number} rating - Movie rating
 * @returns {string} - Formatted rating string
 */
export const formatRating = (rating) => {
  if (typeof rating !== 'number' || isNaN(rating)) {
    return 'N/A';
  }
  return rating.toFixed(1);
};
