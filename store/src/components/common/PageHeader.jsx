const PageHeader = ({ title, subtitle, children }) => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
    </div>
    {children && <div className="flex items-center gap-3">{children}</div>}
  </div>
);

export default PageHeader;
