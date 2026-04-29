import { useState } from "react";
import { Package } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { formatCurrency, formatPhoneNumber } from "../utils/formatters";
import { useOrders } from "../context/OrderContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/common/PageHeader";
import StatusFilterTabs from "../components/kitchen/StatusFilterTabs";
import OrderCard from "../components/kitchen/OrderCard";
import OrderStatusBadge from "../components/kitchen/OrderStatusBadge";
import OrderItemsList from "../components/kitchen/OrderItemsList";

const KitchenDisplayPage = () => {
  const { orders, isLoading, updateOrderStatus, getOrdersByStatus, getOrderCountByStatus } = useOrders();
  const [selectedStatus, setSelectedStatus] = useState("all");

  if (isLoading) return <LoadingSpinner message="Loading orders..." />;

  const statusFilters = [
    { value: "all",      label: "All Orders", count: orders.length },
    { value: "pending",  label: "Pending",    count: getOrderCountByStatus("pending") },
    { value: "on_grill", label: "On Grill",   count: getOrderCountByStatus("on_grill") },
    { value: "ready",    label: "Ready",       count: getOrderCountByStatus("ready") },
  ];

  const displayOrders = selectedStatus === "all" ? orders : getOrdersByStatus(selectedStatus);

  const STATUS_CONFIG = {
    pending:  { bg: "bg-yellow-100 text-yellow-800 border-yellow-300", label: "Pending" },
    on_grill: { bg: "bg-orange-100 text-orange-800 border-orange-300", label: "On Grill" },
    ready:    { bg: "bg-green-100 text-green-800 border-green-300",    label: "Ready" },
  };

  const ACTION_CONFIG = {
    pending:  { text: "Start Cooking", cls: "bg-orange-600 hover:bg-orange-700" },
    on_grill: { text: "Mark Ready",    cls: "bg-green-600 hover:bg-green-700" },
    ready:    { text: "Complete",      cls: "bg-blue-600 hover:bg-blue-700" },
  };

  const STATUS_FLOW = { pending: "on_grill", on_grill: "ready", ready: "dispatched" };

  const ORDER_TYPE_ICON = { delivery: "🚚", takeout: "🥡" };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <PageHeader title="Kitchen Display" subtitle="Manage and track orders in real-time" />

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
            <span className={`ml-2 px-2 py-0.5 rounded-full text-sm ${selectedStatus === f.value ? "bg-white/20" : "bg-gray-100"}`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {displayOrders.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <EmptyState icon={Package} title="No orders found" description="Orders will appear here when they come in" />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayOrders.map((order) => {
            const statusCfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
            const actionCfg = ACTION_CONFIG[order.status];

            return (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-5 space-y-4">
                  {/* Order Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">#{order.orderNumber}</div>
                      <p className="text-sm text-gray-600 mt-0.5">{order.customerName}</p>
                    </div>
                    <div className="text-2xl">{ORDER_TYPE_ICON[order.orderType] || "🍽️"}</div>
                  </div>

                  {/* Status Badge */}
                  <OrderStatusBadge status={order.status} />

                  {/* Items */}
                  <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                    <p className="text-xs font-semibold text-gray-600 uppercase">Items</p>
                    <OrderItemsList items={order.items.map(i => ({
                      quantity: i.quantity,
                      name: i.productName,
                      notes: i.customization,
                    }))} />
                  </div>

                  {/* Special Instructions */}
                  {order.specialInstructions && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                      <p className="text-xs font-semibold text-yellow-800 mb-1">⚠️ Special Instructions</p>
                      <p className="text-sm text-yellow-900">{order.specialInstructions}</p>
                    </div>
                  )}

                  {/* Contact / Delivery */}
                  {(order.customerPhone || (order.orderType === "delivery" && order.deliveryAddress)) && (
                    <div className="text-sm text-gray-600 space-y-1">
                      {order.customerPhone && <div>📞 {formatPhoneNumber(order.customerPhone)}</div>}
                      {order.orderType === "delivery" && order.deliveryAddress && (
                        <div className="text-xs">📍 {order.deliveryAddress}</div>
                      )}
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="font-semibold text-gray-700">Total</span>
                    <span className="text-xl font-bold text-gray-900">{formatCurrency(order.totalAmount)}</span>
                  </div>

                  {/* Action Button */}
                  {actionCfg && (
                    <Button
                      onClick={() => updateOrderStatus(order.id, STATUS_FLOW[order.status])}
                      className={`w-full ${actionCfg.cls} text-white`}
                    >
                      {actionCfg.text}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default KitchenDisplayPage;
