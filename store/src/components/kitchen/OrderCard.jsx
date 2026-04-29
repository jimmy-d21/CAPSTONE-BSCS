import OrderStatusBadge from "./OrderStatusBadge";
import OrderItemsList from "./OrderItemsList";
import { Clock } from "lucide-react";

const OrderCard = ({ order, onStatusChange }) => (
  <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
    <div className="flex items-center justify-between mb-3">
      <div>
        <span className="font-bold text-gray-900">#{order.orderNumber}</span>
        <span className="ml-2 text-sm text-gray-500">{order.orderType}</span>
      </div>
      <OrderStatusBadge status={order.status} />
    </div>
    <OrderItemsList items={order.items} />
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Clock className="w-3 h-3" />
        {new Date(order.createdAt).toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" })}
      </div>
      {onStatusChange && (
        <button onClick={() => onStatusChange(order.id)} className="text-xs text-orange-600 font-semibold hover:underline">
          Update Status
        </button>
      )}
    </div>
  </div>
);

export default OrderCard;
