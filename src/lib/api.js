// API Base URL - adjust based on your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

// ============================================
// TALENT APIs
// ============================================

/**
 * Fetch all talents with optional filters
 * @param {Object} filters - { category, genre, search }
 */
export const fetchTalents = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.category) params.append('category', filters.category);
  if (filters.genre) params.append('genre', filters.genre);
  if (filters.search) params.append('search', filters.search);
  
  const queryString = params.toString();
  const endpoint = queryString ? `/talents?${queryString}` : '/talents';
  
  return apiCall(endpoint);
};

/**
 * Fetch single talent by ID
 * @param {number} id - Talent ID
 */
export const fetchTalentById = async (id) => {
  return apiCall(`/talents/${id}`);
};

/**
 * Fetch all available genres
 */
export const fetchGenres = async () => {
  return apiCall('/talents/genres');
};

// ============================================
// SHOWS/PERTUNJUKAN APIs
// ============================================

/**
 * Fetch all shows with optional filters
 * @param {Object} filters - { category, search, date }
 */
export const fetchShows = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.category) params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);
  if (filters.date) params.append('date', filters.date);
  
  const queryString = params.toString();
  const endpoint = queryString ? `/pertunjukan?${queryString}` : '/pertunjukan';
  
  return apiCall(endpoint);
};

/**
 * Fetch single show by ID
 * @param {number} id - Show ID
 */
export const fetchShowById = async (id) => {
  return apiCall(`/pertunjukan/${id}`);
};

// ============================================
// NEWS/BERITA APIs
// ============================================

/**
 * Fetch all news with optional filters
 * @param {Object} filters - { category, search }
 */
export const fetchNews = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.category) params.append('category', filters.category);
  if (filters.search) params.append('search', filters.search);
  
  const queryString = params.toString();
  const endpoint = queryString ? `/berita?${queryString}` : '/berita';
  
  return apiCall(endpoint);
};

/**
 * Fetch single news by ID
 * @param {number} id - News ID
 */
export const fetchNewsById = async (id) => {
  return apiCall(`/berita/${id}`);
};

// ============================================
// BOOKING APIs
// ============================================

/**
 * Create talent booking
 * @param {Object} bookingData - Booking form data
 */
export const createTalentBooking = async (bookingData) => {
  return apiCall('/talent-bookings', {
    method: 'POST',
    body: JSON.stringify(bookingData),
  });
};

/**
 * Fetch user's talent bookings
 */
export const fetchUserTalentBookings = async () => {
  return apiCall('/user/talent-bookings');
};

/**
 * Cancel talent booking
 * @param {number} id - Booking ID
 */
export const cancelTalentBooking = async (id) => {
  return apiCall(`/talent-bookings/${id}`, {
    method: 'DELETE',
  });
};

// ============================================
// TICKET ORDER APIs
// ============================================

/**
 * Create ticket order
 * @param {Object} orderData - Order form data
 */
export const createTicketOrder = async (orderData) => {
  return apiCall('/event-ticket-orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
};

/**
 * Fetch user's ticket orders
 */
export const fetchUserTicketOrders = async () => {
  return apiCall('/user/event-ticket-orders');
};

// ============================================
// CATEGORIES/SENIMAN APIs
// ============================================

/**
 * Fetch all categories (seniman)
 */
export const fetchCategories = async () => {
  return apiCall('/seniman');
};

/**
 * Fetch category by ID
 * @param {number} id - Category ID
 */
export const fetchCategoryById = async (id) => {
  return apiCall(`/seniman/${id}`);
};

// ============================================
// WISHLIST APIs
// ============================================

/**
 * Fetch user's wishlist
 */
export const fetchWishlist = async () => {
  return apiCall('/wishlists');
};

/**
 * Add item to wishlist
 * @param {Object} data - { item_type: 'talent' | 'show', item_id: number }
 */
export const addToWishlist = async (data) => {
  return apiCall('/wishlists', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Remove item from wishlist
 * @param {number} id - Wishlist item ID
 */
export const removeFromWishlist = async (id) => {
  return apiCall(`/wishlists/${id}`, {
    method: 'DELETE',
  });
};

/**
 * Check if item is in wishlist
 * @param {string} itemType - 'talent' | 'show'
 * @param {number} itemId - Item ID
 */
export const checkWishlist = async (itemType, itemId) => {
  return apiCall(`/wishlists/check?item_type=${itemType}&item_id=${itemId}`);
};

export default {
  // Talents
  fetchTalents,
  fetchTalentById,
  fetchGenres,
  
  // Shows
  fetchShows,
  fetchShowById,
  
  // News
  fetchNews,
  fetchNewsById,
  
  // Bookings
  createTalentBooking,
  fetchUserTalentBookings,
  cancelTalentBooking,
  
  // Ticket Orders
  createTicketOrder,
  fetchUserTicketOrders,
  
  // Categories
  fetchCategories,
  fetchCategoryById,
  
  // Wishlist
  fetchWishlist,
  addToWishlist,
  removeFromWishlist,
  checkWishlist,
};
