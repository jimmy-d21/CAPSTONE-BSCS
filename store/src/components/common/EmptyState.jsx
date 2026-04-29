const EmptyState = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    {Icon && <Icon className="w-12 h-12 text-gray-300 mb-4" />}
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    {description && <p className="text-gray-500 mt-1 text-sm">{description}</p>}
  </div>
);

export default EmptyState;
