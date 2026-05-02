// Utility functions for form validation

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Philippine mobile number
 * @param {string} mobile - Mobile number to validate
 * @returns {boolean} True if valid
 */
export const validatePhilippineMobile = (mobile) => {
  // Remove all non-numeric characters
  const cleaned = mobile.replace(/\D/g, '');
  
  // Check if it starts with 63 and has 12 digits, or starts with 09 and has 11 digits
  const isInternationalFormat = cleaned.startsWith('63') && cleaned.length === 12;
  const isLocalFormat = cleaned.startsWith('09') && cleaned.length === 11;
  
  return isInternationalFormat || isLocalFormat;
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (password.length < 8) {
    return {
      isValid: false,
      message: 'Password must be at least 8 characters long'
    };
  }
  
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one uppercase letter'
    };
  }
  
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one lowercase letter'
    };
  }
  
  if (!/[0-9]/.test(password)) {
    return {
      isValid: false,
      message: 'Password must contain at least one number'
    };
  }
  
  return {
    isValid: true,
    message: 'Password is strong'
  };
};

/**
 * Validate required field
 * @param {string} value - Value to validate
 * @returns {boolean} True if not empty
 */
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validate name (letters, spaces, hyphens only)
 * @param {string} name - Name to validate
 * @returns {boolean} True if valid
 */
export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z\s\-\.]+$/;
  return nameRegex.test(name) && name.trim().length >= 2;
};
