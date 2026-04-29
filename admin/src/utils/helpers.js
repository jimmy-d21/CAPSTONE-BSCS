// General utility helper functions
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const truncate = (str, length = 50) => {
  return str.length > length ? str.substring(0, length) + "..." : str;
};

export const isEmpty = (obj) => {
  return (
    obj == null ||
    obj === "" ||
    (Array.isArray(obj) && obj.length === 0) ||
    (typeof obj === "object" && Object.keys(obj).length === 0)
  );
};

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
