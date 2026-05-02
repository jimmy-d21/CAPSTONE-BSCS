import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useBranch } from "../context/BranchContext";
import { useOrder } from "../context/OrderContext";
import { BottomNav } from "../components/layout/BottomNav";
import { Button } from "../components/ui/Button";
import { Divider } from "../components/ui/Divider";
import { Badge } from "../components/ui/Badge";
import { Input } from "../components/ui/Input";
import { formatPrice } from "../utils/formatters";
import { mockAddresses } from "../data/userData";
import {
  MapPin,
  CreditCard,
  Check,
  Plus,
  X,
  Star,
  ChevronLeft,
  Pencil,
} from "lucide-react";
import { toast } from "sonner";

/* ─── address storage key ─── */
const ADDR_KEY = "ribshack_addresses";

function loadAddresses(userId) {
  try {
    const raw = localStorage.getItem(ADDR_KEY);
    const all = raw ? JSON.parse(raw) : mockAddresses;
    return all.filter((a) => a.userId === userId);
  } catch {
    return mockAddresses.filter((a) => a.userId === userId);
  }
}

function saveAddresses(userId, addresses) {
  try {
    const raw = localStorage.getItem(ADDR_KEY);
    const all = raw ? JSON.parse(raw) : mockAddresses;
    const rest = all.filter((a) => a.userId !== userId);
    localStorage.setItem(ADDR_KEY, JSON.stringify([...rest, ...addresses]));
  } catch {
    /* ignore */
  }
}

/* ─── small helpers ─── */
function SectionCard({ title, children }) {
  return (
    <div
      style={{
        background: "var(--bg-card)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1.5px solid var(--border)",
        marginBottom: "12px",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        style={{
          padding: "14px 16px 10px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <p
          style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-1)" }}
        >
          {title}
        </p>
      </div>
      <div style={{ padding: "14px 16px" }}>{children}</div>
    </div>
  );
}

/* ── Modal overlay ── */
function Modal({ onClose, children }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(15,10,0,0.55)",
        display: "flex",
        alignItems: "flex-end",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          background: "var(--bg-card)",
          borderRadius: "24px 24px 0 0",
          padding: "24px 20px 36px",
          maxHeight: "80dvh",
          overflowY: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AddAddressModal
───────────────────────────────────────────── */
function AddAddressModal({ userId, onSave, onClose }) {
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [setDefault, setSetDefault] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!label.trim()) e.label = "Label is required (e.g. Home, Office)";
    if (!address.trim()) e.address = "Full address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      id: Date.now(),
      userId,
      label: label.trim(),
      fullAddress: address.trim(),
      landmark: landmark.trim() || undefined,
      isDefault: setDefault,
    });
  };

  return (
    <Modal onClose={onClose}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ fontSize: "18px", fontWeight: 800 }}>Add New Address</h2>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-3)",
          }}
        >
          <X size={20} />
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <label
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-2)",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Label <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          {/* Quick label chips */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "8px",
              flexWrap: "wrap",
            }}
          >
            {["Home", "Office", "School", "Other"].map((l) => (
              <button
                key={l}
                onClick={() => setLabel(l)}
                style={{
                  padding: "5px 14px",
                  borderRadius: "99px",
                  fontSize: "12px",
                  fontWeight: 600,
                  cursor: "pointer",
                  border: `1.5px solid ${label === l ? "var(--accent)" : "var(--border)"}`,
                  background:
                    label === l ? "var(--accent-light)" : "var(--bg-muted)",
                  color: label === l ? "var(--accent)" : "var(--text-2)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {l}
              </button>
            ))}
          </div>
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Or type a custom label…"
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "var(--radius-md)",
              border: `1.5px solid ${errors.label ? "var(--accent)" : "var(--border)"}`,
              background: "var(--bg-input)",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              color: "var(--text-1)",
              outline: "none",
            }}
          />
          {errors.label && (
            <p
              style={{
                fontSize: "11px",
                color: "var(--accent)",
                marginTop: "4px",
                fontWeight: 500,
              }}
            >
              {errors.label}
            </p>
          )}
        </div>

        <div>
          <label
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-2)",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Full Address <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="House No., Street, Barangay, City, Province…"
            rows={3}
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "var(--radius-md)",
              border: `1.5px solid ${errors.address ? "var(--accent)" : "var(--border)"}`,
              background: "var(--bg-input)",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              color: "var(--text-1)",
              outline: "none",
              resize: "none",
              lineHeight: 1.5,
            }}
          />
          {errors.address && (
            <p
              style={{
                fontSize: "11px",
                color: "var(--accent)",
                marginTop: "4px",
                fontWeight: 500,
              }}
            >
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <label
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "var(--text-2)",
              display: "block",
              marginBottom: "6px",
            }}
          >
            Landmark{" "}
            <span
              style={{
                fontSize: "11px",
                color: "var(--text-4)",
                fontWeight: 500,
              }}
            >
              (optional)
            </span>
          </label>
          <input
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="Near landmark, e.g. Near SM City"
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border)",
              background: "var(--bg-input)",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              color: "var(--text-1)",
              outline: "none",
            }}
          />
        </div>

        {/* Set as default toggle */}
        <div
          onClick={() => setSetDefault((v) => !v)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "13px 14px",
            borderRadius: "var(--radius-md)",
            border: `1.5px solid ${setDefault ? "var(--accent)" : "var(--border)"}`,
            background: setDefault ? "var(--accent-light)" : "var(--bg-card)",
            cursor: "pointer",
          }}
        >
          <Star
            size={16}
            color={setDefault ? "var(--accent)" : "var(--text-4)"}
            fill={setDefault ? "var(--accent)" : "none"}
          />
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "var(--text-1)",
              }}
            >
              Set as default address
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "var(--text-3)",
                fontWeight: 500,
              }}
            >
              This will be pre-selected at checkout
            </p>
          </div>
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "6px",
              border: `2px solid ${setDefault ? "var(--accent)" : "var(--border-strong)"}`,
              background: setDefault ? "var(--accent)" : "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {setDefault && <Check size={13} color="#fff" strokeWidth={3} />}
          </div>
        </div>

        <Button
          fullWidth
          size="lg"
          onClick={handleSave}
          style={{ marginTop: "4px" }}
        >
          Save Address
        </Button>
      </div>
    </Modal>
  );
}

/* ─────────────────────────────────────────────
   CheckoutPage
───────────────────────────────────────────── */
export function CheckoutPage() {
  const navigate = useNavigate();
  const {
    cartItems,
    getCartTotal,
    getDeliveryFee,
    getGrandTotal,
    clearCart,
    getItemLineTotal,
  } = useCart();
  const { user } = useAuth();
  const { selectedBranch } = useBranch();
  const { placeOrder } = useOrder();

  /* ── Address state ── */
  const [addresses, setAddresses] = useState(() => loadAddresses(user?.id));
  const [selectedAddrId, setSelectedAddrId] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* Pick default on mount */
  useEffect(() => {
    const def = addresses.find((a) => a.isDefault) ?? addresses[0];
    if (def) setSelectedAddrId(def.id);
  }, []);

  const handleAddAddress = (newAddr) => {
    let updated = [...addresses];

    // If new address is default, clear others
    if (newAddr.isDefault) {
      updated = updated.map((a) => ({ ...a, isDefault: false }));
    }

    updated = [...updated, newAddr];
    setAddresses(updated);
    saveAddresses(user?.id, updated);
    setSelectedAddrId(newAddr.id);
    setShowAddModal(false);
    toast.success("Address saved!");
  };

  const handleSetDefault = (addrId) => {
    const updated = addresses.map((a) => ({
      ...a,
      isDefault: a.id === addrId,
    }));
    setAddresses(updated);
    saveAddresses(user?.id, updated);
    toast.success("Default address updated!");
  };

  /* ── Order ── */
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [notes, setNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  const subtotal = getCartTotal();
  const deliveryFee = getDeliveryFee();
  const total = getGrandTotal();

  const handlePlaceOrder = () => {
    if (!selectedAddrId) {
      toast.error("Select a delivery address");
      return;
    }
    setProcessing(true);

    setTimeout(() => {
      const addr = addresses.find((a) => a.id === selectedAddrId);
      const order = placeOrder({
        userId: user?.id,
        branchId: selectedBranch?.id,
        items: cartItems.map((i) => ({
          menuItemId: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          addOns: i.customization?.addOns ?? [],
          lineTotal: getItemLineTotal(i),
        })),
        subtotal,
        deliveryFee,
        total,
        paymentMethod,
        deliveryAddress: addr?.fullAddress ?? "",
        notes,
      });

      clearCart();
      setProcessing(false);
      toast.success("Order placed! Salamat! 🍗");
      navigate(`/order-tracking/${order.id}`);
    }, 2000);
  };

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
          gap: "10px",
          padding: "0 16px",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "var(--radius-md)",
            background: "var(--bg-muted)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--text-1)",
          }}
        >
          <ChevronLeft size={18} />
        </button>
        <h1
          style={{ fontSize: "18px", fontWeight: 800, color: "var(--text-1)" }}
        >
          Checkout
        </h1>
      </header>

      <div
        style={{
          padding: "calc(var(--nav-h) + 14px) 16px calc(var(--tab-h) + 110px)",
        }}
      >
        {/* Branch strip */}
        {selectedBranch && (
          <div
            style={{
              background: "var(--brand-900)",
              borderRadius: "var(--radius-lg)",
              padding: "12px 14px",
              marginBottom: "12px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                background: "var(--accent)",
                borderRadius: "8px",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <MapPin size={15} color="#fff" />
            </div>
            <div>
              <p
                style={{
                  color: "var(--brand-300)",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                Ordering from
              </p>
              <p style={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}>
                {selectedBranch.name}
              </p>
            </div>
          </div>
        )}

        {/* ── Delivery Address ── */}
        <div
          style={{
            background: "var(--bg-card)",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            border: "1.5px solid var(--border)",
            marginBottom: "12px",
            boxShadow: "var(--shadow-sm)",
          }}
        >
          <div
            style={{
              padding: "14px 16px 10px",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontSize: "14px", fontWeight: 700 }}>
              Delivery Address
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "5px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--accent)",
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "var(--font-sans)",
              }}
            >
              <Plus size={14} /> Add New
            </button>
          </div>

          <div
            style={{
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {addresses.length === 0 ? (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <p
                  style={{
                    color: "var(--text-3)",
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: "12px",
                  }}
                >
                  No saved addresses yet
                </p>
                <Button
                  size="sm"
                  onClick={() => setShowAddModal(true)}
                  style={{ gap: "6px" }}
                >
                  <Plus size={14} /> Add Address
                </Button>
              </div>
            ) : (
              addresses.map((addr) => (
                <AddressCard
                  key={addr.id}
                  addr={addr}
                  selected={selectedAddrId === addr.id}
                  onSelect={() => setSelectedAddrId(addr.id)}
                  onSetDefault={() => handleSetDefault(addr.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* ── Payment ── */}
        <SectionCard title="Payment Method">
          {[
            {
              id: "COD",
              label: "Cash on Delivery",
              desc: "Pay when your order arrives",
              icon: "💵",
              available: true,
            },
            {
              id: "CARD",
              label: "Credit / Debit Card",
              desc: "Coming soon",
              icon: "💳",
              available: false,
            },
            {
              id: "GCASH",
              label: "GCash",
              desc: "Coming soon",
              icon: "📱",
              available: false,
            },
          ].map((pm) => (
            <div
              key={pm.id}
              onClick={() => pm.available && setPaymentMethod(pm.id)}
              style={{
                display: "flex",
                gap: "12px",
                padding: "12px",
                borderRadius: "var(--radius-md)",
                marginBottom: "8px",
                cursor: pm.available ? "pointer" : "not-allowed",
                border: `1.5px solid ${paymentMethod === pm.id ? "var(--accent)" : "var(--border)"}`,
                background: !pm.available
                  ? "var(--bg-muted)"
                  : paymentMethod === pm.id
                    ? "var(--accent-light)"
                    : "#fff",
                opacity: pm.available ? 1 : 0.5,
              }}
            >
              <span style={{ fontSize: "20px", flexShrink: 0 }}>{pm.icon}</span>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    marginBottom: "2px",
                  }}
                >
                  {pm.label}
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color: "var(--text-3)",
                    fontWeight: 500,
                  }}
                >
                  {pm.desc}
                </p>
              </div>
              {paymentMethod === pm.id && (
                <Check size={18} color="var(--accent)" />
              )}
            </div>
          ))}
        </SectionCard>

        {/* ── Notes ── */}
        <SectionCard title="Special Instructions">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special requests or delivery notes…"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border)",
              background: "var(--bg-input)",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              color: "var(--text-1)",
              outline: "none",
              resize: "none",
              minHeight: "80px",
              lineHeight: 1.5,
              fontWeight: 500,
            }}
          />
        </SectionCard>

        {/* ── Order Summary ── */}
        <SectionCard title="Order Summary">
          {cartItems.map((item) => {
            const addOns = item.customization?.addOns ?? [];
            return (
              <div key={item.cartId} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "2px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--text-2)",
                      fontWeight: 600,
                    }}
                  >
                    {item.quantity}× {item.name}
                    {item.customization?.cut
                      ? ` (${item.customization.cut})`
                      : ""}
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 700 }}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
                {addOns.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      paddingLeft: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--text-3)",
                        fontWeight: 500,
                      }}
                    >
                      {a.emoji} {a.name} ×{item.quantity}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--text-3)",
                        fontWeight: 600,
                      }}
                    >
                      +{formatPrice(a.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
          <Divider style={{ margin: "10px 0" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "6px",
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
              marginBottom: "12px",
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
                color: deliveryFee === 0 ? "var(--green)" : "inherit",
              }}
            >
              {deliveryFee === 0 ? "FREE" : formatPrice(deliveryFee)}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              background: "var(--brand-900)",
              margin: "0 -4px",
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>
              Total
            </span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: "var(--brand-300)",
              }}
            >
              {formatPrice(total)}
            </span>
          </div>
        </SectionCard>
      </div>

      {/* Sticky footer */}
      <div
        style={{
          position: "fixed",
          bottom: "var(--tab-h)",
          left: 0,
          right: 0,
          background: "var(--bg-card)",
          borderTop: "1.5px solid var(--border)",
          padding: "12px 16px",
        }}
      >
        <Button
          fullWidth
          size="lg"
          loading={processing}
          onClick={handlePlaceOrder}
        >
          {!processing && `Place Order · ${formatPrice(total)}`}
        </Button>
      </div>

      {/* Add address modal */}
      {showAddModal && (
        <AddAddressModal
          userId={user?.id}
          onSave={handleAddAddress}
          onClose={() => setShowAddModal(false)}
        />
      )}

      <BottomNav />
    </div>
  );
}

/* ─── Address card with set-default action ─── */
function AddressCard({ addr, selected, onSelect, onSetDefault }) {
  return (
    <div
      onClick={onSelect}
      style={{
        display: "flex",
        gap: "12px",
        padding: "12px",
        borderRadius: "var(--radius-md)",
        cursor: "pointer",
        border: `1.5px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        background: selected ? "var(--accent-light)" : "#fff",
      }}
    >
      {/* Radio */}
      <div
        style={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          flexShrink: 0,
          marginTop: "2px",
          border: `2px solid ${selected ? "var(--accent)" : "var(--border-strong)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {selected && (
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "var(--accent)",
            }}
          />
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "4px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "14px", fontWeight: 700 }}>
            {addr.label}
          </span>
          {addr.isDefault && (
            <Badge
              color="gold"
              style={{ fontSize: "10px", padding: "1px 7px" }}
            >
              <Star
                size={9}
                fill="currentColor"
                style={{ marginRight: "3px" }}
              />{" "}
              Default
            </Badge>
          )}
        </div>
        <p
          style={{
            fontSize: "12px",
            color: "var(--text-2)",
            lineHeight: 1.4,
            fontWeight: 500,
          }}
        >
          {addr.fullAddress}
        </p>
        {addr.landmark && (
          <p
            style={{
              fontSize: "11px",
              color: "var(--text-3)",
              marginTop: "2px",
            }}
          >
            📍 {addr.landmark}
          </p>
        )}

        {/* Set as default button (only shows if NOT default) */}
        {!addr.isDefault && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSetDefault();
            }}
            style={{
              marginTop: "8px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: "99px",
              padding: "3px 10px",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 600,
              color: "var(--text-3)",
            }}
          >
            <Star size={10} /> Set as default
          </button>
        )}
      </div>
    </div>
  );
}
