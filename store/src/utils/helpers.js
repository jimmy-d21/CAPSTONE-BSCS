// Helper utility functions

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }
};

// Filter orders by status
export const filterOrdersByStatus = (orders, status) => {
  if (!status || status === 'all') {
    return orders;
  }
  return orders.filter(order => order.status === status);
};

// Sort orders by time
export const sortOrdersByTime = (orders, ascending = true) => {
  return [...orders].sort((a, b) => {
    const timeA = new Date(a.orderReceivedAt).getTime();
    const timeB = new Date(b.orderReceivedAt).getTime();
    return ascending ? timeA - timeB : timeB - timeA;
  });
};

// Get low stock items
export const getLowStockItems = (inventory) => {
  return inventory.filter(item => 
    item.status === 'low' || item.status === 'critical'
  );
};

// Calculate total order value
export const calculateOrderTotal = (items) => {
  return items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
};

// Group items by category
export const groupByCategory = (items) => {
  return items.reduce((groups, item) => {
    const category = item.category || 'Other';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const user = storage.get('user');
  return user !== null;
};

// Get current branch info
export const getCurrentBranch = () => {
  return storage.get('branch');
};

// Validate Philippine mobile number
export const isValidPhilippineMobile = (phone) => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it starts with 63 and has 12 digits, or starts with 09 and has 11 digits
  return (
    (cleaned.startsWith('63') && cleaned.length === 12) ||
    (cleaned.startsWith('09') && cleaned.length === 11)
  );
};

// Debounce function for search inputs
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Check if time is within business hours
export const isWithinBusinessHours = () => {
  const now = new Date();
  const hours = now.getHours();
  return hours >= 8 && hours < 22; // 8 AM to 10 PM
};

// Calculate average order value
export const calculateAverageOrderValue = (orders) => {
  if (orders.length === 0) return 0;
  const total = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  return total / orders.length;
};

// Get orders by type
export const getOrdersByType = (orders, type) => {
  return orders.filter(order => order.orderType === type);
};

// Generate random color for charts
export const getRandomColor = () => {
  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
