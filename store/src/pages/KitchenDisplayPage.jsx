import { useState } from "react";
import { Package } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import {
  formatCurrency,
  formatPhoneNumber,
  formatOrderStatus,
} from "../utils/formatters";
import { useOrders } from "../context/OrderContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/common/PageHeader";
import OrderStatusBadge from "../components/kitchen/OrderStatusBadge";
import OrderDetailModal from "../components/kitchen/OrderDetailModal";

const STATUS_FLOW = {
  pending: "on_grill",
  on_grill: "ready",
  ready: "dispatched",
};
const ACTION_CONFIG = {
  pending: { text: "Start Cooking", cls: "bg-orange-600 hover:bg-orange-700" },
  on_grill: { text: "Mark Ready", cls: "bg-green-600 hover:bg-green-700" },
  ready: { text: "Complete", cls: "bg-blue-600 hover:bg-blue-700" },
};
const ORDER_TYPE_ICON = { delivery: "🚚", "dine-in": "🍽️", takeout: "🥡" };

// Status ring colour for the card border
const STATUS_BORDER = {
  pending: "border-l-4 border-l-yellow-400",
  on_grill: "border-l-4 border-l-orange-500",
  ready: "border-l-4 border-l-green-500",
  dispatched: "border-l-4 border-l-blue-400",
  completed: "border-l-4 border-l-gray-300",
};

const KitchenDisplayPage = () => {
  const {
    orders,
    isLoading,
    updateOrderStatus,
    getOrdersByStatus,
    getOrderCountByStatus,
  } = useOrders();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (isLoading) return <LoadingSpinner message="Loading orders..." />;

  // Keep modal in sync when orders update (e.g. after advancing status)
  const liveSelected = selectedOrder
    ? (orders.find((o) => o.id === selectedOrder.id) ?? selectedOrder)
    : null;

  const statusFilters = [
    { value: "all", label: "All Orders", count: orders.length },
    {
      value: "pending",
      label: "Pending",
      count: getOrderCountByStatus("pending"),
    },
    {
      value: "on_grill",
      label: "On Grill",
      count: getOrderCountByStatus("on_grill"),
    },
    { value: "ready", label: "Ready", count: getOrderCountByStatus("ready") },
    {
      value: "dispatched",
      label: "Dispatched",
      count: getOrderCountByStatus("dispatched"),
    },
  ];

  const displayOrders =
    selectedStatus === "all" ? orders : getOrdersByStatus(selectedStatus);

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <PageHeader
        title="Kitchen Display"
        subtitle="Tap an order card to view full details, add drinks or extras"
      />

      {/* Status Filter Tabs */}
      <div className="flex gap-3 flex-wrap">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setSelectedStatus(f.value)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              selectedStatus === f.value
                ? "bg-orange-600 text-white shadow-md"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {f.label}
            <span
              className={`ml-2 px-2 py-0.5 rounded-full text-sm ${
                selectedStatus === f.value ? "bg-white/20" : "bg-gray-100"
              }`}
            >
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {displayOrders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <EmptyState
              icon={Package}
              title="No orders found"
              description="Orders will appear here when they come in"
            />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayOrders.map((order) => {
            const actionCfg = ACTION_CONFIG[order.status];
            const borderCls = STATUS_BORDER[order.status] || "";

            return (
              <Card
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className={`hover:shadow-xl transition-all cursor-pointer hover:-translate-y-0.5 ${borderCls}`}
              >
                <CardContent className="p-5 space-y-4">
                  {/* Order Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        #{order.orderNumber}
                      </div>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {order.customerName}
                      </p>
                    </div>
                    <div className="text-2xl">
                      {ORDER_TYPE_ICON[order.orderType] ?? "🍽️"}
                    </div>
                  </div>

                  {/* Status Badge */}
                  <OrderStatusBadge status={order.status} />

                  {/* Items summary */}
                  <div className="bg-gray-50 rounded-xl p-3 space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Items
                    </p>
                    {order.items.map((item) => (
                      <div key={item.id} className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-orange-600 bg-orange-100 rounded-md px-1.5 py-0.5">
                            {item.quantity}×
                          </span>
                          <span className="text-sm font-medium text-gray-800">
                            {item.productName}
                          </span>
                        </div>
                        {/* Show addon count hint */}
                        {item.addons.length > 0 && (
                          <p className="text-[11px] text-gray-400 ml-8">
                            +{item.addons.length} add-on
                            {item.addons.length > 1 ? "s" : ""} (
                            {item.addons.map((a) => a.name).join(", ")})
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Special Instructions */}
                  {order.specialInstructions && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                      <p className="text-xs font-semibold text-yellow-800 mb-0.5">
                        ⚠️ Special Instructions
                      </p>
                      <p className="text-sm text-yellow-900">
                        {order.specialInstructions}
                      </p>
                    </div>
                  )}

                  {/* Total + action */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-3">
                    <div>
                      <p className="text-xs text-gray-400">Total</p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(order.totalAmount)}
                      </p>
                    </div>
                    {actionCfg && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(
                            order.id,
                            STATUS_FLOW[order.status],
                          );
                        }}
                        className={`text-xs font-semibold px-4 py-2 rounded-xl text-white transition-all ${actionCfg.cls}`}
                      >
                        {actionCfg.text}
                      </button>
                    )}
                  </div>

                  {/* View detail hint */}
                  <p className="text-[11px] text-gray-400 text-center">
                    Tap card to view full details &amp; add drinks / extras
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Order Detail Modal */}
      {liveSelected && (
        <OrderDetailModal
          order={liveSelected}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default KitchenDisplayPage;
