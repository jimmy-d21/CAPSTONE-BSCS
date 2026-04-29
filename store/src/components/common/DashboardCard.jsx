const DashboardCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = "orange",
}) => {
  const colorClasses = {
    orange: "bg-orange-50 text-orange-600",
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
          {trend && (
            <div
              className={`text-xs mt-2 ${trend.positive ? "text-green-600" : "text-red-600"}`}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </div>
          )}
        </div>
        {Icon && (
          <div
            className={`w-12 h-12 rounded-lg ${colorClasses[color]} flex items-center justify-center`}
          >
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
