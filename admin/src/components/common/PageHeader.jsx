export default function PageHeader({ icon: Icon, iconBg = "bg-gradient-to-br from-orange-500 to-red-600", title, subtitle, actions }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`p-3 ${iconBg} rounded-2xl shadow-lg`}>
            <Icon className="size-7 text-white" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
