const LoadingSpinner = ({ message = "Loading..." }) => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600 font-semibold">{message}</p>
    </div>
  </div>
);

export default LoadingSpinner;
