// Utility functions for formatting data
export const formatCurrency = (amount, currency = "PHP") => {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat("en-PH").format(number);
};

export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-PH", {
    ...defaultOptions,
    ...options,
  }).format(new Date(date));
};

export const formatTime = (date) => {
  return new Intl.DateTimeFormat("en-PH", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
