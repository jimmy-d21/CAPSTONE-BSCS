const STATUS = {
  pending: "bg-yellow-100 text-yellow-800",
  preparing: "bg-blue-100 text-blue-800",
  ready: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-600",
};

const OrderStatusBadge = ({ status }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS[status] || STATUS.pending}`}>
    {status?.charAt(0).toUpperCase() + status?.slice(1)}
  </span>
);

export default OrderStatusBadge;
