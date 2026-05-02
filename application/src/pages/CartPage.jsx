import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useBranch } from "../context/BranchContext";
import { BottomNav } from "../components/layout/BottomNav";
import { QuantityStepper } from "../components/common/QuantityStepper";
import { Button } from "../components/ui/Button";
import { Divider } from "../components/ui/Divider";
import { getItemImage, FALLBACK_IMG } from "../components/menu/FoodImages";
import { formatPrice } from "../utils/formatters";
import {
  Trash2,
  ShoppingBag,
  MapPin,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

/* ─────────────────────────────────────────────
   Expandable Cart Item Card
───────────────────────────────────────────── */
function CartItemCard({ item, onUpdateQty, onRemove, getItemLineTotal }) {
  const [expanded, setExpanded] = useState(false);

  const addOns = item.customization?.addOns ?? [];
  const cut = item.customization?.cut;
  const hasDetails = cut || addOns.length > 0;
  const drinks = addOns.filter((a) => a.type === "drink");
  const extras = addOns.filter((a) => a.type === "extra");
  const lineTotal = getItemLineTotal(item);

  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: "var(--radius-lg)",
        border: "1.5px solid var(--border)",
        overflow: "hidden",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      {/* ── Main row ── */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          padding: "12px",
        }}
      >
        <img
          src={getItemImage(item.image)}
          alt={item.name}
          style={{
            width: "66px",
            height: "66px",
            borderRadius: "10px",
            objectFit: "cover",
            flexShrink: 0,
            background: "var(--bg-muted)",
          }}
          onError={(e) => {
            e.target.src = FALLBACK_IMG;
          }}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "var(--text-1)",
              marginBottom: "2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {item.name}
          </p>

          {cut && (
            <p
              style={{
                fontSize: "11px",
                color: "var(--accent)",
                fontWeight: 700,
                marginBottom: "2px",
              }}
            >
              {cut}
            </p>
          )}

          {/* Add-on pill summary (collapsed) */}
          {!expanded && addOns.length > 0 && (
            <p
              style={{
                fontSize: "11px",
                color: "var(--text-3)",
                fontWeight: 500,
                marginBottom: "2px",
              }}
            >
              +{addOns.length} add-on{addOns.length > 1 ? "s" : ""}
            </p>
          )}

          <p
            style={{
              fontSize: "15px",
              fontWeight: 800,
              color: "var(--text-1)",
            }}
          >
            {formatPrice(lineTotal)}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => onRemove(item.cartId)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-4)",
              padding: "2px",
              display: "flex",
            }}
          >
            <Trash2 size={14} />
          </button>
          <QuantityStepper
            value={item.quantity}
            onIncrease={() => onUpdateQty(item.cartId, item.quantity + 1)}
            onDecrease={() => onUpdateQty(item.cartId, item.quantity - 1)}
          />
        </div>
      </div>

      {/* ── Expand / collapse trigger ── */}
      {hasDetails && (
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            padding: "7px 12px",
            borderTop: "1px dashed var(--border)",
            background: "var(--bg-muted)",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: 600,
            color: "var(--text-3)",
            fontFamily: "var(--font-sans)",
          }}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? "Hide details" : "View details"}
        </button>
      )}

      {/* ── Expanded details panel ── */}
      {expanded && hasDetails && (
        <div
          style={{
            padding: "12px 14px",
            borderTop: "1px solid var(--border)",
            background: "var(--bg-muted)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Cut */}
          {cut && (
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
                  color: "var(--text-3)",
                  fontWeight: 600,
                }}
              >
                Cut preference
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "var(--accent)",
                  background: "var(--accent-light)",
                  padding: "2px 10px",
                  borderRadius: "99px",
                }}
              >
                {cut}
              </span>
            </div>
          )}

          {/* Drinks */}
          {drinks.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--text-4)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "6px",
                }}
              >
                Drinks
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                {drinks.map((d) => (
                  <AddonLine key={d.id} addon={d} qty={item.quantity} />
                ))}
              </div>
            </div>
          )}

          {/* Extras */}
          {extras.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: "11px",
                  color: "var(--text-4)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: "6px",
                }}
              >
                Extras
              </p>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                {extras.map((e) => (
                  <AddonLine key={e.id} addon={e} qty={item.quantity} />
                ))}
              </div>
            </div>
          )}

          {/* Price breakdown */}
          <div
            style={{
              borderTop: "1px dashed var(--border-strong)",
              paddingTop: "8px",
              display: "flex",
              flexDirection: "column",
              gap: "3px",
            }}
          >
            <PriceLine
              label={`Base × ${item.quantity}`}
              value={item.price * item.quantity}
            />
            {drinks.length > 0 && (
              <PriceLine
                label={`Drinks × ${item.quantity}`}
                value={drinks.reduce((s, d) => s + d.price, 0) * item.quantity}
                accent
              />
            )}
            {extras.length > 0 && (
              <PriceLine
                label={`Extras × ${item.quantity}`}
                value={extras.reduce((s, e) => s + e.price, 0) * item.quantity}
                accent
              />
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "4px",
                paddingTop: "4px",
                borderTop: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "var(--text-1)",
                }}
              >
                Line total
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color: "var(--text-1)",
                }}
              >
                {formatPrice(lineTotal)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddonLine({ addon, qty }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ fontSize: "16px" }}>{addon.emoji}</span>
      <span
        style={{
          fontSize: "12px",
          fontWeight: 600,
          color: "var(--text-2)",
          flex: 1,
        }}
      >
        {addon.name}
      </span>
      <span
        style={{ fontSize: "12px", fontWeight: 700, color: "var(--text-3)" }}
      >
        +{formatPrice(addon.price)}
      </span>
    </div>
  );
}

function PriceLine({ label, value, accent }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span
        style={{ fontSize: "12px", color: "var(--text-3)", fontWeight: 500 }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: "12px",
          fontWeight: 700,
          color: accent ? "var(--accent)" : "var(--text-2)",
        }}
      >
        {formatPrice(value)}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CartPage
───────────────────────────────────────────── */
export function CartPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartTotal,
    getDeliveryFee,
    getGrandTotal,
    clearCart,
    getItemLineTotal,
  } = useCart();
  const { isAuthenticated } = useAuth();
  const { selectedBranch } = useBranch();

  const subtotal = getCartTotal();
  const deliveryFee = getDeliveryFee();
  const total = getGrandTotal();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!selectedBranch) {
      navigate("/branches");
      return;
    }
    navigate("/checkout");
  };

  /* ── Empty state ── */
  if (cartItems.length === 0) {
    return (
      <div
        style={{
          background: "var(--bg)",
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
        }}
      >
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
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "var(--text-1)",
            }}
          >
            Your Cart
          </h1>
        </header>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            padding: "80px 24px calc(var(--tab-h) + 20px)",
          }}
        >
          <div
            style={{
              width: "88px",
              height: "88px",
              background: "var(--bg-muted)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingBag size={36} color="var(--text-4)" />
          </div>
          <div style={{ textAlign: "center" }}>
            <h2
              style={{ fontSize: "20px", fontWeight: 800, marginBottom: "6px" }}
            >
              Your cart is empty
            </h2>
            <p
              style={{
                color: "var(--text-3)",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              Add some delicious BBQ to get started!
            </p>
          </div>
          <Button onClick={() => navigate("/menu")}>Browse Menu</Button>
        </div>

        <BottomNav />
      </div>
    );
  }

  /* ── Filled state ── */
  return (
    <div style={{ background: "var(--bg)", minHeight: "100dvh" }}>
      {/* Header */}
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
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        <h1
          style={{ fontSize: "20px", fontWeight: 800, color: "var(--text-1)" }}
        >
          Your Cart
          <span
            style={{
              marginLeft: "8px",
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-3)",
            }}
          >
            ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
          </span>
        </h1>
        <button
          onClick={clearCart}
          style={{
            background: "none",
            border: "none",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--accent)",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
          }}
        >
          Clear all
        </button>
      </header>

      <div
        style={{
          padding: "calc(var(--nav-h) + 16px) 16px calc(var(--tab-h) + 140px)",
        }}
      >
        {/* Branch strip */}
        {selectedBranch && (
          <div
            style={{
              background: "var(--bg-card)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "10px 14px",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <MapPin size={14} color="var(--accent)" />
            <p
              style={{
                fontSize: "13px",
                color: "var(--text-2)",
                fontWeight: 500,
              }}
            >
              <span style={{ fontWeight: 700, color: "var(--text-1)" }}>
                {selectedBranch.name}
              </span>
              <span style={{ color: "var(--text-4)" }}> · </span>
              <Clock
                size={11}
                style={{ display: "inline", verticalAlign: "middle" }}
              />{" "}
              {selectedBranch.estimatedDelivery}
            </p>
          </div>
        )}

        {/* Hint */}
        <div
          style={{
            background: "var(--brand-100)",
            borderRadius: "10px",
            padding: "8px 12px",
            marginBottom: "14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span style={{ fontSize: "14px" }}>💡</span>
          <p
            style={{
              fontSize: "12px",
              color: "var(--brand-600)",
              fontWeight: 600,
            }}
          >
            Tap "View details" on any item to see its add-ons &amp; price
            breakdown.
          </p>
        </div>

        {/* Cart items */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {cartItems.map((item) => (
            <CartItemCard
              key={item.cartId}
              item={item}
              onUpdateQty={updateQuantity}
              onRemove={removeFromCart}
              getItemLineTotal={getItemLineTotal}
            />
          ))}
        </div>
      </div>

      {/* Sticky checkout footer */}
      <div
        style={{
          position: "fixed",
          bottom: "var(--tab-h)",
          left: 0,
          right: 0,
          background: "var(--bg-card)",
          borderTop: "1.5px solid var(--border)",
          padding: "14px 16px",
          boxShadow: "0 -4px 24px rgba(15,10,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "5px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              color: "var(--text-3)",
              fontWeight: 500,
            }}
          >
            Subtotal
          </span>
          <span style={{ fontSize: "13px", fontWeight: 700 }}>
            {formatPrice(subtotal)}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: deliveryFee > 0 ? "8px" : "12px",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              color: "var(--text-3)",
              fontWeight: 500,
            }}
          >
            Delivery Fee
          </span>
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: deliveryFee === 0 ? "var(--green)" : "var(--text-1)",
            }}
          >
            {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
          </span>
        </div>
        {deliveryFee > 0 && (
          <div
            style={{
              background: "var(--brand-100)",
              borderRadius: "8px",
              padding: "7px 10px",
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "var(--brand-600)",
                fontWeight: 600,
              }}
            >
              Add {formatPrice(500 - subtotal)} more for FREE delivery 🚀
            </p>
          </div>
        )}
        <Button
          fullWidth
          size="lg"
          onClick={handleCheckout}
          style={{ gap: "8px" }}
        >
          Checkout · {formatPrice(total)} <ArrowRight size={17} />
        </Button>
      </div>

      <BottomNav />
    </div>
  );
}
