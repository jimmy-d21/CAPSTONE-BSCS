// Utility functions for formatting and helpers

// Format currency to Philippine Peso
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2
  }).format(amount);
};

// Format date and time
export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Format time only
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-PH', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Format date only
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};

// Get time ago (e.g., "5 minutes ago")
export const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return 'Just now';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
};

// Get status color
export const getStatusColor = (status) => {
  const colors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    on_grill: 'bg-orange-100 text-orange-800 border-orange-300',
    ready: 'bg-green-100 text-green-800 border-green-300',
    dispatched: 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-gray-100 text-gray-800 border-gray-300',
    cancelled: 'bg-red-100 text-red-800 border-red-300'
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
};

// Get inventory status color
export const getInventoryStatusColor = (status) => {
  const colors = {
    adequate: 'bg-green-100 text-green-800 border-green-300',
    low: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    critical: 'bg-red-100 text-red-800 border-red-300'
  };
  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-300';
};

// Get urgency color
export const getUrgencyColor = (urgency) => {
  const colors = {
    low: 'bg-blue-100 text-blue-800 border-blue-300',
    normal: 'bg-gray-100 text-gray-800 border-gray-300',
    high: 'bg-orange-100 text-orange-800 border-orange-300',
    critical: 'bg-red-100 text-red-800 border-red-300'
  };
  return colors[urgency] || 'bg-gray-100 text-gray-800 border-gray-300';
};

// Format order status for display
export const formatOrderStatus = (status) => {
  const statusMap = {
    pending: 'Order Received',
    on_grill: 'Grilling',
    ready: 'Ready',
    dispatched: 'Out for Delivery',
    completed: 'Completed',
    cancelled: 'Cancelled'
  };
  return statusMap[status] || status;
};

// Format order type for display
export const formatOrderType = (type) => {
  const typeMap = {
    'dine-in': 'Dine-in',
    'delivery': 'Delivery'
  };
  return typeMap[type] || type;
};

// Calculate elapsed time in minutes
export const calculateElapsedTime = (startTime) => {
  const start = new Date(startTime);
  const now = new Date();
  const diffInMs = now - start;
  return Math.floor(diffInMs / 60000); // Convert to minutes
};

// Format Philippine mobile number
export const formatPhoneNumber = (phone) => {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as +63 XXX XXX XXXX
  if (cleaned.startsWith('63') && cleaned.length === 12) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
  }
  
  return phone;
};

// Generate order number
export const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  return `ORD-${timestamp}`;
};
