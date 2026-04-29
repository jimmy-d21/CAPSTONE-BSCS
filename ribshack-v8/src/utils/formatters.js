// Utility functions for formatting data

/**
 * Format price to Philippine Peso format
 * @param {number} amount - The amount to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (amount) => {
  return `₱${amount.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

/**
 * Format phone number to Philippine format
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as +63 XXX XXX XXXX
  if (cleaned.startsWith('63') && cleaned.length === 12) {
    return `+63 ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  
  // Format as 09XX XXX XXXX
  if (cleaned.startsWith('09') && cleaned.length === 11) {
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if format doesn't match
};

/**
 * Format distance
 * @param {number} distance - Distance in kilometers
 * @returns {string} Formatted distance string
 */
export const formatDistance = (distance) => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)}m`;
  }
  return `${distance.toFixed(1)}km`;
};

/**
 * Format date to readable format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const d = new Date(date);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return d.toLocaleDateString('en-PH', options);
};

/**
 * Format date to time only
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted time string
 */
export const formatTime = (date) => {
  const d = new Date(date);
  const options = { 
    hour: '2-digit',
    minute: '2-digit'
  };
  return d.toLocaleTimeString('en-PH', options);
};

/**
 * Calculate estimated delivery time
 * @param {string} estimatedTime - Estimated time string (e.g., "30-40 mins")
 * @returns {Date} Estimated delivery date
 */
export const calculateDeliveryTime = (estimatedTime) => {
  const now = new Date();
  const avgMinutes = estimatedTime.includes('-') 
    ? parseInt(estimatedTime.split('-')[1]) 
    : parseInt(estimatedTime);
  
  return new Date(now.getTime() + avgMinutes * 60000);
};
