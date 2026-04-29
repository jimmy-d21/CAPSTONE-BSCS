const STATUS_STYLES = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-600",
  pending: "bg-yellow-100 text-yellow-700",
  critical: "bg-red-100 text-red-700",
};

const StatusBadge = ({ status, label }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[status] || STATUS_STYLES.inactive}`}>
    {label || status}
  </span>
);

export default StatusBadge;
