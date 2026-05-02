import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useOrder } from "../context/OrderContext";
import { BottomNav } from "../components/layout/BottomNav";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Divider } from "../components/ui/Divider";
import { mockOrders } from "../data/userData";
import { formatPrice } from "../utils/formatters";
import {
  Package,
  ChevronRight,
  MapPin,
  CreditCard,
  Clock,
  CheckCircle,
  Flame,
  Bike,
  X,
  Receipt,
  Plus,
} from "lucide-react";

const STATUS_LABEL = {
  order_received: "Received",
  grilling: "Grilling 🔥",
  ready: "Ready",
  out_for_delivery: "On the Way 🛵",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
const STATUS_COLOR = {
  order_received: "neutral",
  grilling: "red",
  ready: "green",
  out_for_delivery: "neutral",
  delivered: "green",
  cancelled: "neutral",
};
const STATUS_EMOJI = {
  order_received: "✅",
  grilling: "🔥",
  ready: "📦",
  out_for_delivery: "🛵",
  delivered: "🎉",
  cancelled: "❌",
};

const STEPS = [
  { key: "order_received", label: "Order Received", icon: CheckCircle },
  { key: "grilling", label: "Grilling", icon: Flame },
  { key: "ready", label: "Ready", icon: Package },
  { key: "out_for_delivery", label: "On the Way", icon: Bike },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];
const STEP_KEYS = STEPS.map((s) => s.key);

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-PH", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
    " · " +
    d.toLocaleTimeString("en-PH", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
}

function OrderDetailModal({ order, onClose }) {
  const navigate = useNavigate();
  const currentIdx = STEP_KEYS.indexOf(order.status);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(15,10,0,0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-up"
        style={{
          background: "var(--bg)",
          borderRadius: "24px 24px 0 0",
          maxHeight: "90dvh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 0 0",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "4px",
              borderRadius: "99px",
              background: "var(--border-strong)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px 0",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "12px",
                color: "var(--text-3)",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Order
            </p>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 800,
                color: "var(--text-1)",
              }}
            >
              #{order.id}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "var(--bg-muted)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={18} color="var(--text-2)" />
          </button>
        </div>

        <div
          style={{ overflowY: "auto", padding: "16px" }}
          className="no-scrollbar"
        >
          {/* Status hero */}
          <div
            style={{
              background: "var(--brand-900)",
              borderRadius: "var(--radius-lg)",
              padding: "20px",
              textAlign: "center",
              marginBottom: "16px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 0%, rgba(240,180,41,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ fontSize: "40px", marginBottom: "8px" }}>
              {STATUS_EMOJI[order.status] ?? "✅"}
            </div>
            <p style={{ color: "#fff", fontSize: "16px", fontWeight: 800 }}>
              {STATUS_LABEL[order.status]}
            </p>
          </div>

          {/* Progress */}
          {order.status !== "cancelled" && (
            <div
              style={{
                background: "var(--bg-card)",
                borderRadius: "var(--radius-lg)",
                padding: "16px",
                border: "1.5px solid var(--border)",
                marginBottom: "16px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <p
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--text-2)",
                  marginBottom: "14px",
                }}
              >
                Order Progress
              </p>
              <div style={{ display: "flex", alignItems: "center" }}>
                {STEPS.map((step, i) => {
                  const done = i <= currentIdx;
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.key}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flex: i < STEPS.length - 1 ? 1 : "none",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background: done
                              ? "var(--accent)"
                              : "var(--bg-muted)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: done
                              ? "2px solid var(--accent)"
                              : "2px solid var(--border)",
                            transition: "all 0.3s",
                          }}
                        >
                          <Icon
                            size={14}
                            color={done ? "#fff" : "var(--text-4)"}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "9px",
                            fontWeight: 600,
                            color: done ? "var(--accent)" : "var(--text-4)",
                            textAlign: "center",
                            maxWidth: "44px",
                            lineHeight: 1.2,
                          }}
                        >
                          {step.label}
                        </span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div
                          style={{
                            flex: 1,
                            height: "2px",
                            background:
                              i < currentIdx
                                ? "var(--accent)"
                                : "var(--border)",
                            margin: "0 4px",
                            marginBottom: "16px",
                            transition: "background 0.3s",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Items with add-ons */}
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-lg)",
              border: "1.5px solid var(--border)",
              marginBottom: "16px",
              overflow: "hidden",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              style={{
                padding: "14px 16px",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Receipt size={15} color="var(--accent)" />
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "var(--text-1)",
                }}
              >
                Order Items
              </p>
            </div>
            {(order.items || []).map((item, i) => {
              const addOns = item.addOns || item.customization?.addOns || [];
              return (
                <div
                  key={i}
                  style={{
                    borderBottom:
                      i < order.items.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: "12px 16px",
                      paddingBottom: addOns.length ? "6px" : "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          width: "28px",
                          height: "28px",
                          borderRadius: "8px",
                          background: "var(--bg-muted)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 800,
                            color: "var(--accent)",
                          }}
                        >
                          {item.quantity}×
                        </span>
                      </div>
                      <div>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "var(--text-1)",
                          }}
                        >
                          {item.name}
                        </span>
                        {item.customization?.cut && (
                          <p
                            style={{
                              fontSize: "11px",
                              color: "var(--text-3)",
                              fontWeight: 500,
                              marginTop: "2px",
                            }}
                          >
                            Cut: {item.customization.cut}
                          </p>
                        )}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "var(--text-2)",
                        flexShrink: 0,
                      }}
                    >
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                  {addOns.length > 0 && (
                    <div
                      style={{
                        margin: "0 16px 10px 54px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                      }}
                    >
                      {addOns.map((addon, ai) => (
                        <div
                          key={ai}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "5px 10px",
                            borderRadius: "8px",
                            background:
                              addon.type === "drink"
                                ? "rgba(59,130,246,0.06)"
                                : "rgba(240,180,41,0.07)",
                            border: `1px solid ${addon.type === "drink" ? "rgba(59,130,246,0.15)" : "rgba(240,180,41,0.2)"}`,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <Plus size={9} color="var(--text-4)" />
                            <span style={{ fontSize: "12px" }}>
                              {addon.emoji ??
                                (addon.type === "drink" ? "🥤" : "➕")}
                            </span>
                            <span
                              style={{
                                fontSize: "11px",
                                fontWeight: 600,
                                color: "var(--text-2)",
                              }}
                            >
                              {addon.name}
                            </span>
                          </div>
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: 600,
                              color: "var(--text-3)",
                            }}
                          >
                            +{formatPrice(addon.price)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div
              style={{
                padding: "12px 16px",
                borderTop: "1px solid var(--border)",
                background: "var(--bg-muted)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                }}
              >
                <span style={{ fontSize: "13px", color: "var(--text-3)" }}>
                  Subtotal
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text-2)",
                  }}
                >
                  {formatPrice(order.subtotal)}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "13px", color: "var(--text-3)" }}>
                  Delivery Fee
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "var(--text-2)",
                  }}
                >
                  {formatPrice(order.deliveryFee)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "var(--text-1)",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "var(--accent)",
                  }}
                >
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Info rows */}
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-lg)",
              border: "1.5px solid var(--border)",
              overflow: "hidden",
              marginBottom: "16px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {[
              {
                icon: <MapPin size={15} color="var(--accent)" />,
                label: "Delivery Address",
                value: order.deliveryAddress,
              },
              {
                icon: <CreditCard size={15} color="var(--accent)" />,
                label: "Payment Method",
                value: order.paymentMethod,
              },
            ].map((row, i, arr) => (
              <div
                key={row.label}
                style={{
                  padding: "13px 16px",
                  borderBottom:
                    i < arr.length - 1 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ marginTop: "2px" }}>{row.icon}</div>
                <div>
                  <p
                    style={{
                      fontSize: "11px",
                      color: "var(--text-3)",
                      fontWeight: 600,
                      textTransform: "uppercase",
                      letterSpacing: "0.4px",
                      marginBottom: "2px",
                    }}
                  >
                    {row.label}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "var(--text-1)",
                    }}
                  >
                    {row.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {order.status !== "delivered" && order.status !== "cancelled" && (
            <Button
              fullWidth
              onClick={() => {
                onClose();
              }}
              style={{ marginBottom: "8px" }}
            >
              Track Live →
            </Button>
          )}
          <div style={{ height: "24px" }} />
        </div>
      </div>
    </div>
  );
}

export function OrdersPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { getUserOrders } = useOrder();
  const [activeTab, setActiveTab] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (!isAuthenticated) {
    return (
      <div
        style={{
          background: "var(--bg)",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          padding: "24px",
        }}
      >
        <span style={{ fontSize: "48px" }}>📋</span>
        <h2
          style={{ fontSize: "22px", fontWeight: 800, color: "var(--text-1)" }}
        >
          Sign In Required
        </h2>
        <p
          style={{
            color: "var(--text-3)",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          Sign in to view your orders.
        </p>
        <Button onClick={() => navigate("/login")}>Sign In</Button>
        <BottomNav />
      </div>
    );
  }

  const storedOrders = getUserOrders(user.id);
  const mockUserOrders = mockOrders.filter((o) => o.userId === user.id);
  const allOrders = [...storedOrders, ...mockUserOrders].sort(
    (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
  );

  const TABS = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "delivered", label: "Delivered" },
  ];

  const filtered = allOrders.filter((o) => {
    if (activeTab === "active")
      return !["delivered", "cancelled"].includes(o.status);
    if (activeTab === "delivered") return o.status === "delivered";
    return true;
  });

  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh" }}>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          background: "var(--bg-card)",
          borderBottom: "1.5px solid var(--border)",
          height: "var(--nav-h)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <h1
          style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-1)" }}
        >
          My Orders
        </h1>
        <span
          style={{
            marginLeft: "8px",
            background: "var(--accent)",
            color: "#fff",
            fontSize: "11px",
            fontWeight: 700,
            borderRadius: "99px",
            padding: "2px 8px",
          }}
        >
          {allOrders.length}
        </span>
      </header>

      <div
        style={{
          paddingTop: "calc(var(--nav-h) + 0px)",
          paddingBottom: "calc(var(--tab-h) + 24px)",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "var(--nav-h)",
            zIndex: 80,
            background: "var(--bg)",
            borderBottom: "1px solid var(--border)",
            padding: "12px 16px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              overflowX: "auto",
              paddingBottom: "12px",
            }}
            className="no-scrollbar"
          >
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  flexShrink: 0,
                  padding: "7px 16px",
                  borderRadius: "99px",
                  border: "none",
                  cursor: "pointer",
                  background:
                    activeTab === tab.key ? "var(--accent)" : "var(--bg-muted)",
                  color: activeTab === tab.key ? "#fff" : "var(--text-2)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: 700,
                  fontSize: "13px",
                  transition: "all 0.2s",
                }}
              >
                {tab.label}
                {tab.key === "active" &&
                  (() => {
                    const n = allOrders.filter(
                      (o) => !["delivered", "cancelled"].includes(o.status),
                    ).length;
                    return n > 0 ? (
                      <span
                        style={{
                          marginLeft: "5px",
                          background:
                            activeTab === tab.key
                              ? "rgba(255,255,255,0.3)"
                              : "var(--accent)",
                          color: "#fff",
                          fontSize: "10px",
                          fontWeight: 800,
                          borderRadius: "99px",
                          padding: "1px 5px",
                        }}
                      >
                        {n}
                      </span>
                    ) : null;
                  })()}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: "16px" }}>
          {filtered.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px 24px",
                textAlign: "center",
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "48px" }}>🍽️</span>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  color: "var(--text-1)",
                }}
              >
                No orders {activeTab !== "all" ? `(${activeTab})` : ""} yet
              </h3>
              <p
                style={{
                  color: "var(--text-3)",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                Time to order some delicious BBQ!
              </p>
              <Button
                onClick={() => navigate("/menu")}
                style={{ marginTop: "8px" }}
              >
                Browse Menu
              </Button>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {filtered.map((order) => {
                const allAddOns = (order.items || []).flatMap(
                  (i) => i.addOns || i.customization?.addOns || [],
                );
                return (
                  <div
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    style={{
                      background: "var(--bg-card)",
                      borderRadius: "var(--radius-lg)",
                      border: "1.5px solid var(--border)",
                      boxShadow: "var(--shadow-sm)",
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "box-shadow 0.2s, transform 0.1s",
                    }}
                    onMouseDown={(e) =>
                      (e.currentTarget.style.transform = "scale(0.99)")
                    }
                    onMouseUp={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    onTouchStart={(e) =>
                      (e.currentTarget.style.transform = "scale(0.99)")
                    }
                    onTouchEnd={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    {!["delivered", "cancelled"].includes(order.status) && (
                      <div
                        style={{
                          background: "var(--accent)",
                          padding: "6px 14px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <div
                          style={{
                            width: "7px",
                            height: "7px",
                            borderRadius: "50%",
                            background: "#fff",
                            animation: "pulse-accent 2s infinite",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "#fff",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Live — {STATUS_LABEL[order.status]}
                        </span>
                      </div>
                    )}
                    <div
                      style={{
                        padding: "14px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "14px",
                          flexShrink: 0,
                          background:
                            order.status === "delivered"
                              ? "var(--green-bg)"
                              : "var(--brand-100)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "22px",
                        }}
                      >
                        {STATUS_EMOJI[order.status]}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "4px",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "15px",
                              fontWeight: 800,
                              color: "var(--text-1)",
                            }}
                          >
                            Order #{order.id}
                          </span>
                          <Badge
                            color={STATUS_COLOR[order.status] || "neutral"}
                            style={{ fontSize: "11px" }}
                          >
                            {STATUS_LABEL[order.status]}
                          </Badge>
                        </div>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "var(--text-3)",
                            fontWeight: 500,
                            marginBottom: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {(order.items || []).map((i) => i.name).join(", ")}
                        </p>
                        {allAddOns.length > 0 && (
                          <div
                            style={{
                              display: "flex",
                              gap: "4px",
                              flexWrap: "wrap",
                              marginBottom: "4px",
                            }}
                          >
                            {allAddOns.slice(0, 3).map((addon, ai) => (
                              <span
                                key={ai}
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 600,
                                  padding: "2px 7px",
                                  borderRadius: "99px",
                                  background:
                                    addon.type === "drink"
                                      ? "rgba(59,130,246,0.1)"
                                      : "rgba(240,180,41,0.12)",
                                  color:
                                    addon.type === "drink"
                                      ? "#2563eb"
                                      : "var(--brand-700)",
                                  border: `1px solid ${addon.type === "drink" ? "rgba(59,130,246,0.2)" : "rgba(240,180,41,0.25)"}`,
                                }}
                              >
                                {addon.emoji ??
                                  (addon.type === "drink" ? "🥤" : "➕")}{" "}
                                {addon.name}
                              </span>
                            ))}
                            {allAddOns.length > 3 && (
                              <span
                                style={{
                                  fontSize: "10px",
                                  fontWeight: 600,
                                  color: "var(--text-4)",
                                  padding: "2px 6px",
                                }}
                              >
                                +{allAddOns.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span
                            style={{
                              fontSize: "12px",
                              color: "var(--text-4)",
                              fontWeight: 500,
                            }}
                          >
                            {(order.items || []).reduce(
                              (s, i) => s + i.quantity,
                              0,
                            )}{" "}
                            items ·{" "}
                            {formatDate(order.orderDate).split(" · ")[0]}
                          </span>
                          <span
                            style={{
                              fontSize: "15px",
                              fontWeight: 800,
                              color: "var(--accent)",
                            }}
                          >
                            {formatPrice(order.total)}
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} color="var(--text-4)" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <BottomNav />
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
