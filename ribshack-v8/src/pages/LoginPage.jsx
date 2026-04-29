import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  validateEmail,
  validatePhilippineMobile,
  validatePassword,
  validateName,
} from "../utils/validators";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { toast } from "sonner";
import { Eye, EyeOff, UtensilsCrossed } from "lucide-react";

const LOGO_URL =
  "https://imgs.search.brave.com/hWbozxaUVaBFXWHC_C_uy8BIvSKkKx6Sc_QSI2SuXVs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kM3Vw/NDh3c3M2bHZqLmNs/b3VkZnJvbnQubmV0/L2RhdGEvdXBsb2Fk/cy8yMDIxLzAyL1Jp/YnNoYWNrX1NNQkQu/anBn";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [tab, setTab] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [showConfirmPw, setShowConfirmPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const errs = {};
    if (!validateEmail(loginData.email)) errs.email = "Enter a valid email";
    if (!loginData.password) errs.password = "Password is required";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    const result = login(loginData.email, loginData.password);
    setLoading(false);
    if (result.success) {
      toast.success("Welcome back! 🍖");
      navigate("/home");
    } else {
      setErrors({});
      toast.error(result.error);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const errs = {};
    if (!validateName(regData.name)) errs.name = "Enter your full name";
    if (!validateEmail(regData.email)) errs.email = "Enter a valid email";
    if (!validatePhilippineMobile(regData.mobile))
      errs.mobile = "Enter a valid PH mobile (09XX XXX XXXX)";
    const pw = validatePassword(regData.password);
    if (!pw.isValid) errs.password = pw.message;
    if (regData.password !== regData.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    const result = register(regData);
    setLoading(false);
    if (result.success) {
      toast.success("Account created! Welcome! 🎉");
      navigate("/branches");
    } else {
      setErrors({});
      toast.error(result.error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      {/* Hero section */}
      <div
        style={{
          background: "var(--brand-900)",
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
          padding: tab === "login" ? "56px 24px 48px" : "40px 24px 36px",
          textAlign: "center",
          transition: "padding 0.3s ease",
        }}
      >
        {/* Decorative flames */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "400px",
            height: "250px",
            background:
              "radial-gradient(ellipse, rgba(240,140,41,0.15) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            left: "-40px",
            width: "200px",
            height: "200px",
            background:
              "radial-gradient(circle, rgba(230,51,41,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            right: "-40px",
            width: "200px",
            height: "200px",
            background:
              "radial-gradient(circle, rgba(230,51,41,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* Logo */}
        <div
          style={{
            width: tab === "login" ? "100px" : "80px",
            height: tab === "login" ? "100px" : "80px",
            borderRadius: tab === "login" ? "28px" : "22px",
            margin: "0 auto 16px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(230,51,41,0.3)",
            border: "2px solid rgba(255,255,255,0.15)",
            transition: "all 0.3s ease",
            flexShrink: 0,
          }}
        >
          <img
            src={LOGO_URL}
            alt="Ribshack Logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML =
                '<span style="font-size:40px">🍖</span>';
            }}
          />
        </div>

        {tab === "login" ? (
          <>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "40px",
                color: "#fff",
                marginBottom: "6px",
                lineHeight: 1,
              }}
            >
              Welcome back
            </h1>
            <p
              style={{
                color: "var(--brand-300)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
              }}
            >
              Sign in to your account
            </p>
          </>
        ) : (
          <>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "34px",
                color: "#fff",
                marginBottom: "6px",
                lineHeight: 1,
              }}
            >
              Join Ribshack
            </h1>
            <p
              style={{
                color: "var(--brand-300)",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "1.2px",
                textTransform: "uppercase",
              }}
            >
              Create your account · It's free
            </p>
          </>
        )}
      </div>

      {/* Form sheet */}
      <div
        style={{
          flex: 1,
          background: "var(--bg)",
          borderRadius: "24px 24px 0 0",
          marginTop: "-20px",
          padding: "24px 20px 48px",
          overflowY: "auto",
          boxShadow: "0 -8px 32px rgba(15,10,0,0.12)",
        }}
      >
        {/* Pill handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "4px",
              borderRadius: "99px",
              background: "var(--border-strong)",
            }}
          />
        </div>

        {/* Tab switcher */}
        <div
          style={{
            display: "flex",
            background: "var(--bg-muted)",
            borderRadius: "var(--radius-md)",
            padding: "4px",
            marginBottom: "24px",
            gap: "4px",
          }}
        >
          {[
            ["login", "Sign In"],
            ["register", "Create Account"],
          ].map(([t, lbl]) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setErrors({});
              }}
              style={{
                flex: 1,
                padding: "10px 8px",
                borderRadius: "10px",
                border: "none",
                background: tab === t ? "#fff" : "transparent",
                color: tab === t ? "var(--text-1)" : "var(--text-3)",
                fontFamily: "var(--font-sans)",
                fontWeight: 700,
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: tab === t ? "var(--shadow-sm)" : "none",
                transition: "all 0.2s",
              }}
            >
              {lbl}
            </button>
          ))}
        </div>

        {tab === "login" ? (
          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <Input
              label="Email Address"
              type="email"
              placeholder="juan@email.com"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
              error={errors.email}
            />
            <Input
              label="Password"
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
              error={errors.password}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-3)",
                    padding: 0,
                    display: "flex",
                  }}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            {/* Demo hint */}
            <div
              style={{
                background: "var(--brand-50)",
                borderRadius: "var(--radius-md)",
                padding: "12px 14px",
                border: "1px dashed var(--brand-300)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginBottom: "6px",
                }}
              >
                <span style={{ fontSize: "14px" }}>🧪</span>
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "var(--brand-600)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Demo Account
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setLoginData({
                    email: "juan.delacruz@email.com",
                    password: "Password123",
                  })
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  textAlign: "left",
                }}
              >
                <p
                  style={{
                    fontSize: "12px",
                    fontFamily: "monospace",
                    color: "var(--brand-700)",
                    marginBottom: "2px",
                  }}
                >
                  juan.delacruz@email.com
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    fontFamily: "monospace",
                    color: "var(--brand-700)",
                  }}
                >
                  Password123
                </p>
                <p
                  style={{
                    fontSize: "11px",
                    color: "var(--brand-500)",
                    marginTop: "4px",
                    fontWeight: 600,
                  }}
                >
                  Tap to autofill ↑
                </p>
              </button>
            </div>

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="lg"
              style={{ marginTop: "4px" }}
            >
              Sign In
            </Button>

            <p
              style={{
                textAlign: "center",
                fontSize: "13px",
                color: "var(--text-3)",
                fontWeight: 500,
              }}
            >
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setTab("register");
                  setErrors({});
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--accent)",
                  fontWeight: 700,
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  padding: 0,
                }}
              >
                Register
              </button>
            </p>
          </form>
        ) : (
          <form
            onSubmit={handleRegister}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <Input
              label="Full Name"
              type="text"
              placeholder="Juan Dela Cruz"
              value={regData.name}
              onChange={(e) => setRegData({ ...regData, name: e.target.value })}
              error={errors.name}
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="juan@email.com"
              value={regData.email}
              onChange={(e) =>
                setRegData({ ...regData, email: e.target.value })
              }
              error={errors.email}
            />
            <Input
              label="Mobile Number"
              type="tel"
              placeholder="09XX XXX XXXX"
              value={regData.mobile}
              onChange={(e) =>
                setRegData({ ...regData, mobile: e.target.value })
              }
              error={errors.mobile}
            />
            <Input
              label="Password"
              type={showPw ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={regData.password}
              onChange={(e) =>
                setRegData({ ...regData, password: e.target.value })
              }
              error={errors.password}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-3)",
                    padding: 0,
                    display: "flex",
                  }}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            <Input
              label="Confirm Password"
              type={showConfirmPw ? "text" : "password"}
              placeholder="Re-enter password"
              value={regData.confirmPassword}
              onChange={(e) =>
                setRegData({ ...regData, confirmPassword: e.target.value })
              }
              error={errors.confirmPassword}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowConfirmPw((v) => !v)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--text-3)",
                    padding: 0,
                    display: "flex",
                  }}
                >
                  {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="lg"
              style={{ marginTop: "4px" }}
            >
              Create Account
            </Button>

            <p
              style={{
                textAlign: "center",
                fontSize: "13px",
                color: "var(--text-3)",
                fontWeight: 500,
              }}
            >
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  setTab("login");
                  setErrors({});
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--accent)",
                  fontWeight: 700,
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  padding: 0,
                }}
              >
                Sign In
              </button>
            </p>

            <p
              style={{
                textAlign: "center",
                fontSize: "11px",
                color: "var(--text-4)",
                lineHeight: 1.6,
              }}
            >
              By creating an account, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
