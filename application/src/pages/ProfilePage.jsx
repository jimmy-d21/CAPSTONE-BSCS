import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { BottomNav } from "../components/layout/BottomNav";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { mockOrders, mockAddresses } from "../data/userData";
import { formatPrice } from "../utils/formatters";
import {
  MapPin,
  LogOut,
  ChevronRight,
  Package,
  Flame,
  Plus,
  X,
  Home,
  Briefcase,
  Star,
  Pencil,
  Trash2,
  Check,
} from "lucide-react";
import { toast } from "sonner";

function AddressIcon({ label }) {
  const l = (label || "").toLowerCase();
  if (l === "home") return <Home size={16} />;
  if (l === "office" || l === "work") return <Briefcase size={16} />;
  return <MapPin size={16} />;
}

function AddressFormModal({ address, onSave, onClose }) {
  const [form, setForm] = useState({
    label: address?.label || "",
    fullAddress: address?.fullAddress || "",
    landmark: address?.landmark || "",
    isDefault: address?.isDefault || false,
  });
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const errs = {};
    if (!form.label.trim()) errs.label = "Label is required";
    if (!form.fullAddress.trim()) errs.fullAddress = "Full address is required";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave({ ...address, ...form, id: address?.id || Date.now() });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(15,10,0,0.65)",
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
          padding: "0 0 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "12px 0",
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
            padding: "0 16px 16px",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: 800,
              color: "var(--text-1)",
            }}
          >
            {address?.id ? "Edit Address" : "Add New Address"}
          </h2>
          <button
            onClick={onClose}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "var(--bg-muted)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X size={18} color="var(--text-2)" />
          </button>
        </div>
        <div
          style={{
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--text-3)",
                marginBottom: "8px",
                textTransform: "uppercase",
                letterSpacing: "0.4px",
              }}
            >
              Label
            </p>
            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "8px",
              }}
            >
              {["Home", "Office", "Other"].map((lbl) => (
                <button
                  key={lbl}
                  onClick={() => setForm((f) => ({ ...f, label: lbl }))}
                  style={{
                    padding: "6px 14px",
                    borderRadius: "99px",
                    border: "1.5px solid",
                    borderColor:
                      form.label === lbl ? "var(--accent)" : "var(--border)",
                    background:
                      form.label === lbl ? "var(--accent-light)" : "var(--bg)",
                    color:
                      form.label === lbl ? "var(--accent)" : "var(--text-2)",
                    fontFamily: "var(--font-sans)",
                    fontWeight: 700,
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  {lbl}
                </button>
              ))}
            </div>
            <Input
              placeholder="Custom label"
              value={form.label}
              onChange={(e) =>
                setForm((f) => ({ ...f, label: e.target.value }))
              }
              error={errors.label}
            />
          </div>
          <Input
            label="Full Address"
            placeholder="Street, Barangay, City, Province"
            value={form.fullAddress}
            onChange={(e) =>
              setForm((f) => ({ ...f, fullAddress: e.target.value }))
            }
            error={errors.fullAddress}
          />
          <Input
            label="Landmark (optional)"
            placeholder="Near, beside, in front of…"
            value={form.landmark}
            onChange={(e) =>
              setForm((f) => ({ ...f, landmark: e.target.value }))
            }
          />
          <button
            onClick={() => setForm((f) => ({ ...f, isDefault: !f.isDefault }))}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <div
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "6px",
                border: "2px solid",
                borderColor: form.isDefault ? "var(--accent)" : "var(--border)",
                background: form.isDefault ? "var(--accent)" : "var(--bg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "all 0.2s",
              }}
            >
              {form.isDefault && (
                <Check size={13} color="#fff" strokeWidth={3} />
              )}
            </div>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "var(--text-1)",
                fontFamily: "var(--font-sans)",
              }}
            >
              Set as default address
            </span>
          </button>
          <Button
            fullWidth
            size="lg"
            onClick={handleSave}
            style={{ marginTop: "4px" }}
          >
            {address?.id ? "Save Changes" : "Add Address"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function AddressesView({ userId, onBack }) {
  const [addresses, setAddresses] = useState(() =>
    mockAddresses.filter((a) => a.userId === userId),
  );
  const [editing, setEditing] = useState(null);

  const handleSave = (addr) => {
    setAddresses((prev) => {
      let next = prev.find((a) => a.id === addr.id)
        ? prev.map((a) => (a.id === addr.id ? addr : a))
        : [...prev, { ...addr, userId }];
      if (addr.isDefault)
        next = next.map((a) => ({ ...a, isDefault: a.id === addr.id }));
      return next;
    });
    setEditing(null);
    toast.success((prev) => "Address saved!");
  };

  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    toast.success("Address removed");
  };
  const handleSetDefault = (id) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    toast.success("Default address updated");
  };

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
          gap: "10px",
          padding: "0 16px",
        }}
      >
        <button
          onClick={onBack}
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
            fontSize: "18px",
            color: "var(--text-1)",
          }}
        >
          ‹
        </button>
        <h1
          style={{
            fontSize: "20px",
            fontWeight: 800,
            color: "var(--text-1)",
            flex: 1,
          }}
        >
          My Addresses
        </h1>
        <button
          onClick={() => setEditing({})}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 12px",
            borderRadius: "var(--radius-md)",
            background: "var(--accent)",
            border: "none",
            cursor: "pointer",
            color: "#fff",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: "13px",
          }}
        >
          <Plus size={15} /> Add
        </button>
      </header>
      <div
        style={{
          padding: "calc(var(--nav-h) + 16px) 16px calc(var(--tab-h) + 24px)",
        }}
      >
        {addresses.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "60px 24px",
              textAlign: "center",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "48px" }}>📍</span>
            <h3 style={{ fontSize: "18px", fontWeight: 800 }}>
              No addresses yet
            </h3>
            <p style={{ color: "var(--text-3)", fontSize: "14px" }}>
              Add a delivery address for faster checkout.
            </p>
            <Button onClick={() => setEditing({})}>Add Address</Button>
          </div>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {addresses.map((addr) => (
              <div
                key={addr.id}
                style={{
                  background: "var(--bg-card)",
                  borderRadius: "var(--radius-lg)",
                  border: `1.5px solid ${addr.isDefault ? "var(--accent)" : "var(--border)"}`,
                  overflow: "hidden",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                {addr.isDefault && (
                  <div
                    style={{
                      background: "var(--accent)",
                      padding: "5px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <Star size={11} color="#fff" fill="#fff" />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: "#fff",
                        letterSpacing: "0.4px",
                      }}
                    >
                      DEFAULT ADDRESS
                    </span>
                  </div>
                )}
                <div style={{ padding: "14px 16px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "10px",
                        background: "var(--brand-100)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent)",
                      }}
                    >
                      <AddressIcon label={addr.label} />
                    </div>
                    <span style={{ fontSize: "15px", fontWeight: 800 }}>
                      {addr.label}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--text-2)",
                      lineHeight: 1.5,
                      marginBottom: "4px",
                    }}
                  >
                    {addr.fullAddress}
                  </p>
                  {addr.landmark && (
                    <p style={{ fontSize: "12px", color: "var(--text-4)" }}>
                      📌 {addr.landmark}
                    </p>
                  )}
                  <div
                    style={{ display: "flex", gap: "8px", marginTop: "12px" }}
                  >
                    {!addr.isDefault && (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        style={{
                          flex: 1,
                          padding: "8px",
                          borderRadius: "var(--radius-md)",
                          border: "1.5px solid var(--border)",
                          background: "var(--bg-muted)",
                          fontFamily: "var(--font-sans)",
                          fontWeight: 600,
                          fontSize: "12px",
                          color: "var(--text-2)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                        }}
                      >
                        <Star size={12} /> Set Default
                      </button>
                    )}
                    <button
                      onClick={() => setEditing(addr)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        borderRadius: "var(--radius-md)",
                        border: "1.5px solid var(--border)",
                        background: "var(--bg-muted)",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "var(--text-2)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                      }}
                    >
                      <Pencil size={12} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(addr.id)}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "var(--radius-md)",
                        border: "1.5px solid var(--border)",
                        background: "var(--bg-muted)",
                        fontFamily: "var(--font-sans)",
                        color: "var(--accent)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
      {editing !== null && (
        <AddressFormModal
          address={editing}
          onSave={handleSave}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [view, setView] = useState("profile");

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
        <span style={{ fontSize: "48px" }}>👤</span>
        <h2 style={{ fontSize: "22px", fontWeight: 800 }}>Not Logged In</h2>
        <p style={{ color: "var(--text-3)", textAlign: "center" }}>
          Sign in to view your profile.
        </p>
        <Button onClick={() => navigate("/login")}>Sign In</Button>
        <BottomNav />
      </div>
    );
  }

  if (view === "addresses")
    return <AddressesView userId={user.id} onBack={() => setView("profile")} />;

  const userOrders = mockOrders.filter((o) => o.userId === user.id);
  const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);
  const addressCount = mockAddresses.filter((a) => a.userId === user.id).length;

  const MENU_ITEMS = [
    {
      label: "My Orders",
      icon: <Package size={17} />,
      action: () => navigate("/orders"),
      detail: `${userOrders.length} orders`,
    },
    {
      label: "Delivery Addresses",
      icon: <MapPin size={17} />,
      action: () => setView("addresses"),
      detail: `${addressCount} saved`,
    },
    {
      label: "Browse Menu",
      icon: <Flame size={17} />,
      action: () => navigate("/menu"),
      detail: null,
    },
  ];

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
        <h1 style={{ fontSize: "20px", fontWeight: 800 }}>My Account</h1>
      </header>
      <div
        style={{
          paddingTop: "var(--nav-h)",
          paddingBottom: "calc(var(--tab-h) + 24px)",
        }}
      >
        <div
          style={{
            background: "var(--brand-900)",
            padding: "28px 16px 24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 80% 50%, rgba(240,180,41,0.1) 0%, transparent 60%)",
              pointerEvents: "none",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg,var(--accent),var(--brand-400))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 4px 16px rgba(230,51,41,0.4)",
              }}
            >
              <span
                style={{ fontSize: "26px", fontWeight: 800, color: "#fff" }}
              >
                {user.name?.[0]?.toUpperCase() ?? "U"}
              </span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2
                style={{
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: 800,
                  marginBottom: "2px",
                }}
              >
                {user.name}
              </h2>
              <p
                style={{
                  color: "var(--brand-300)",
                  fontSize: "13px",
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {user.email}
              </p>
              {user.mobile && (
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "12px",
                    marginTop: "1px",
                  }}
                >
                  {user.mobile}
                </p>
              )}
            </div>
          </div>
        </div>
        <div
          style={{
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: "10px",
            }}
          >
            {[
              { label: "Orders", value: userOrders.length, icon: "🍖" },
              { label: "Addresses", value: addressCount, icon: "📍" },
              {
                label: "Spent",
                value: `₱${totalSpent.toLocaleString()}`,
                icon: "💰",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "var(--bg-card)",
                  borderRadius: "var(--radius-lg)",
                  padding: "14px 8px",
                  textAlign: "center",
                  border: "1.5px solid var(--border)",
                  boxShadow: "var(--shadow-sm)",
                }}
              >
                <div style={{ fontSize: "22px", marginBottom: "6px" }}>
                  {stat.icon}
                </div>
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: 800,
                    marginBottom: "2px",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    color: "var(--text-3)",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "var(--bg-card)",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              border: "1.5px solid var(--border)",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            {MENU_ITEMS.map((item, i) => (
              <button
                key={item.label}
                onClick={item.action}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "15px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  borderBottom:
                    i < MENU_ITEMS.length - 1
                      ? "1px solid var(--border)"
                      : "none",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "var(--accent-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent)",
                    }}
                  >
                    {item.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "var(--text-1)",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  {item.detail && (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "var(--text-3)",
                        fontWeight: 500,
                      }}
                    >
                      {item.detail}
                    </span>
                  )}
                  <ChevronRight size={16} color="var(--text-4)" />
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              logout();
              toast.success("Logged out. Paalam! 👋");
              navigate("/login");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              width: "100%",
              padding: "14px",
              borderRadius: "var(--radius-lg)",
              border: "1.5px solid var(--border)",
              background: "var(--bg-card)",
              color: "var(--accent)",
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "15px",
              cursor: "pointer",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <LogOut size={17} /> Sign Out
          </button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
