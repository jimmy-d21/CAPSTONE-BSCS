import { useState } from "react";
import { X, Plus, Trash2, ChevronRight } from "lucide-react";
import { useOrders } from "../../context/OrderContext";
import {
  formatCurrency,
  formatTime,
  formatOrderStatus,
} from "../../utils/formatters";

// ─── Status progress steps (matches customer app) ────────────────────────────
const STEPS = [
  { key: "pending", label: "Order\nReceived", icon: "✅" },
  { key: "on_grill", label: "Grilling", icon: "🔥" },
  { key: "ready", label: "Ready", icon: "🎯" },
  { key: "dispatched", label: "On the\nWay", icon: "🛵" },
  { key: "completed", label: "Delivered", icon: "✔️" },
];

const STATUS_FLOW = {
  pending: "on_grill",
  on_grill: "ready",
  ready: "dispatched",
  dispatched: "completed",
};

const ACTION_LABEL = {
  pending: "🔥 Start Grilling",
  on_grill: "✅ Mark Ready",
  ready: "🛵 Dispatch Order",
  dispatched: "✔️ Mark Delivered",
};

const ACTION_COLOR = {
  pending: "bg-orange-600 hover:bg-orange-700",
  on_grill: "bg-green-600 hover:bg-green-700",
  ready: "bg-purple-600 hover:bg-purple-700",
  dispatched: "bg-blue-600 hover:bg-blue-700",
};

const TYPE_BADGE = {
  "dine-in": "bg-blue-100 text-blue-700 border-blue-200",
  delivery: "bg-purple-100 text-purple-700 border-purple-200",
  takeout: "bg-amber-100 text-amber-700 border-amber-200",
};

// ─── Sub-modal: pick a drink or extra ────────────────────────────────────────
function AddonPickerModal({ orderId, itemId, itemName, onClose }) {
  const { AVAILABLE_ADDONS, addAddonToItem } = useOrders();
  const [tab, setTab] = useState("drinks");
  const list =
    tab === "drinks" ? AVAILABLE_ADDONS.drinks : AVAILABLE_ADDONS.extras;

  const handlePick = (addon) => {
    addAddonToItem(orderId, itemId, addon);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="font-bold text-gray-900 text-sm">Add to item</p>
            <p className="text-xs text-gray-500 mt-0.5">{itemName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4 pb-0">
          {["drinks", "extras"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all
                ${
                  tab === t
                    ? "bg-orange-600 text-white shadow"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
            >
              {t === "drinks" ? "🥤 Drinks" : "🍽️ Extras"}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="p-4 space-y-2 max-h-64 overflow-y-auto">
          {list.map((addon) => (
            <button
              key={addon.id}
              onClick={() => handlePick(addon)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-50 hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-all group"
            >
              <span className="text-sm text-gray-800 font-medium">
                {addon.emoji} {addon.name}
              </span>
              <span className="text-xs font-bold text-green-600 group-hover:text-green-700">
                +{formatCurrency(addon.price)}
              </span>
            </button>
          ))}
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ status }) {
  const currentIdx = STEPS.findIndex((s) => s.key === status);

  return (
    <div className="flex items-start gap-0 w-full">
      {STEPS.map((step, i) => {
        const done = i <= currentIdx;
        const active = i === currentIdx;
        const isLast = i === STEPS.length - 1;

        return (
          <div
            key={step.key}
            className="flex-1 flex flex-col items-center relative"
          >
            {/* Left connector */}
            {i > 0 && (
              <div
                className={`absolute left-0 right-1/2 top-4 h-0.5 -translate-y-1/2 z-0
                ${i <= currentIdx ? "bg-red-500" : "bg-gray-200"}`}
              />
            )}
            {/* Right connector */}
            {!isLast && (
              <div
                className={`absolute left-1/2 right-0 top-4 h-0.5 -translate-y-1/2 z-0
                ${i < currentIdx ? "bg-red-500" : "bg-gray-200"}`}
              />
            )}

            {/* Circle */}
            <div
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all
              ${
                active
                  ? "bg-red-600 ring-4 ring-red-100 shadow-md"
                  : done
                    ? "bg-red-500"
                    : "bg-gray-200"
              }`}
            >
              {step.icon}
            </div>

            {/* Label */}
            <p
              className={`text-[9px] text-center leading-tight mt-1.5 whitespace-pre-line font-medium
              ${active ? "text-red-600" : done ? "text-gray-500" : "text-gray-400"}`}
            >
              {step.label}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function OrderDetailModal({ order, onClose }) {
  const { updateOrderStatus, removeAddonFromItem } = useOrders();
  const [addonTarget, setAddonTarget] = useState(null); // { itemId, itemName }

  if (!order) return null;

  // Live total computed from items + addons
  const subtotal = order.items.reduce((sum, item) => {
    const addonTotal = item.addons.reduce((s, a) => s + a.price, 0);
    return sum + (item.unitPrice + addonTotal) * item.quantity;
  }, 0);
  const deliveryFee = order.orderType === "delivery" ? 49 : 0;
  const total = subtotal + deliveryFee;

  const canAdvance = !!STATUS_FLOW[order.status];

  const handleAdvance = () => {
    if (canAdvance) updateOrderStatus(order.id, STATUS_FLOW[order.status]);
  };

  const typeBadgeCls = TYPE_BADGE[order.orderType] || TYPE_BADGE["dine-in"];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 pointer-events-none">
        <div
          className="pointer-events-auto bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Drag handle (mobile) */}
          <div className="flex justify-center pt-3 sm:hidden shrink-0">
            <div className="w-10 h-1 bg-gray-200 rounded-full" />
          </div>

          {/* ── Header ── */}
          <div className="flex items-start justify-between px-5 pt-4 pb-2 shrink-0">
            <div>
              <p className="text-[11px] text-gray-400 uppercase tracking-widest font-semibold">
                Order
              </p>
              <h2 className="text-3xl font-black text-gray-900 leading-none">
                #{order.orderNumber}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="mt-1 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* ── Status Hero Banner ── */}
          <div className="mx-4 mb-3 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-800 p-5 shrink-0">
            <div className="flex flex-col items-center gap-1 mb-5">
              <span className="text-3xl">
                {STEPS.find((s) => s.key === order.status)?.icon ?? "📋"}
              </span>
              <p className="text-base font-bold text-white">
                {formatOrderStatus(order.status)}
              </p>
              <p className="text-xs text-gray-400">
                {formatTime(order.orderReceivedAt)}
              </p>
            </div>
            <ProgressBar status={order.status} />
          </div>

          {/* ── Scrollable body ── */}
          <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
            {/* Customer */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                👤 Customer
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {order.customerName}
              </p>
              {order.customerPhone && (
                <p className="text-xs text-gray-500 mt-0.5">
                  📞 {order.customerPhone}
                </p>
              )}
              <span
                className={`inline-block mt-2 text-[10px] font-bold border px-2 py-0.5 rounded-full capitalize ${typeBadgeCls}`}
              >
                {order.orderType}
              </span>
            </div>

            {/* Delivery address */}
            {order.orderType === "delivery" && order.deliveryAddress && (
              <div className="bg-gray-50 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  📍 Delivery Address
                </p>
                <p className="text-sm text-gray-800">{order.deliveryAddress}</p>
              </div>
            )}

            {/* ── Order Items ── */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 pt-4 pb-3 border-b border-gray-200">
                <span className="text-sm">🍽️</span>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Order Items
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.id} className="px-4 py-3">
                    {/* Item row */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-orange-600 bg-orange-100 rounded-lg w-7 h-7 flex items-center justify-center">
                          {item.quantity}×
                        </span>
                        <div>
                          <p className="text-sm font-bold text-gray-900">
                            {item.productName}
                          </p>
                          {item.customization && (
                            <p className="text-[10px] text-gray-500 italic">
                              {item.customization}
                            </p>
                          )}
                        </div>
                      </div>
                      {item.unitPrice && (
                        <span className="text-sm font-semibold text-gray-700">
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </span>
                      )}
                    </div>

                    {/* Addons */}
                    {item.addons.length > 0 && (
                      <div className="ml-9 space-y-1 mb-2">
                        {item.addons.map((addon) => (
                          <div
                            key={addon.id}
                            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-3 py-1.5"
                          >
                            <span className="text-xs text-gray-700">
                              {addon.emoji} {addon.name}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                +{formatCurrency(addon.price)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Special instructions */}
            {order.specialInstructions && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                  ⚠️ Special Instructions
                </p>
                <p className="text-sm text-amber-900">
                  {order.specialInstructions}
                </p>
              </div>
            )}

            {/* Totals */}
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-200 pt-2 mt-1">
                <span>Total</span>
                <span className="text-red-600">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          {/* ── Footer Action ── */}
          {canAdvance && (
            <div className="p-4 border-t border-gray-100 shrink-0">
              <button
                onClick={handleAdvance}
                className={`w-full py-3.5 rounded-2xl text-sm font-bold text-white transition-all shadow-md ${ACTION_COLOR[order.status]}`}
              >
                {ACTION_LABEL[order.status]}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Addon picker sub-modal */}
      {addonTarget && (
        <AddonPickerModal
          orderId={order.id}
          itemId={addonTarget.itemId}
          itemName={addonTarget.itemName}
          onClose={() => setAddonTarget(null)}
        />
      )}
    </>
  );
}
