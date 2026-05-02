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
import { Eye, EyeOff, Flame } from "lucide-react";

const LOGO_URL =
  "https://imgs.search.brave.com/hWbozxaUVaBFXWHC_C_uy8BIvSKkKx6Sc_QSI2SuXVs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kM3Vw/NDh3c3M2bHZqLmNs/b3VkZnJvbnQubmV0/L2RhdGEvdXBsb2Fk/cy8yMDIxLzAyL1Jp/YnNoYWNrX1NNQkQu/anBn";

export function LoginPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [tab, setTab] = useState("login");
  const [loginShowPw, setLoginShowPw] = useState(false);
  const [regShowPw, setRegShowPw] = useState(false);
  const [regShowConfirmPw, setRegShowConfirmPw] = useState(false);
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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #FFF9F0 0%, #FFEFE0 100%)",
        padding: "16px",
      }}
    >
      {/* Main Card */}
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          backgroundColor: "#FFFFFF",
          borderRadius: "40px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {/* Top Brand Section */}
        <div
          style={{
            padding: "32px 24px 24px",
            textAlign: "center",
            borderBottom: "1px solid #F3F4F6",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "24px",
                backgroundColor: "#FFF7ED",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              }}
            >
              <img
                src={LOGO_URL}
                alt="Ribshack Logo"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.style.backgroundColor = "#F97316";
                    parent.innerHTML = '<span style="font-size:40px">🍖</span>';
                  }
                }}
              />
            </div>
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 700,
              fontFamily: "var(--font-serif)",
              background: "linear-gradient(135deg, #EA580C 0%, #9A3412 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              marginBottom: "8px",
            }}
          >
            Ribshack
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#6B7280",
              fontWeight: 500,
            }}
          >
            {tab === "login"
              ? "Welcome back! Sign in to continue"
              : "Join our flavor-filled community"}
          </p>
        </div>

        {/* Tabs */}
        <div style={{ padding: "24px 24px 0 24px" }}>
          <div
            style={{
              display: "flex",
              gap: "8px",
              backgroundColor: "#F9FAFB",
              padding: "4px",
              borderRadius: "60px",
            }}
          >
            <button
              onClick={() => {
                setTab("login");
                setErrors({});
              }}
              style={{
                flex: 1,
                padding: "12px 8px",
                borderRadius: "40px",
                border: "none",
                backgroundColor: tab === "login" ? "#FFFFFF" : "transparent",
                color: tab === "login" ? "#EA580C" : "#6B7280",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow:
                  tab === "login" ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setTab("register");
                setErrors({});
              }}
              style={{
                flex: 1,
                padding: "12px 8px",
                borderRadius: "40px",
                border: "none",
                backgroundColor: tab === "register" ? "#FFFFFF" : "transparent",
                color: tab === "register" ? "#EA580C" : "#6B7280",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                boxShadow:
                  tab === "register" ? "0 1px 3px rgba(0,0,0,0.05)" : "none",
                transition: "all 0.2s ease",
              }}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Forms Container */}
        <div style={{ padding: "24px" }}>
          {tab === "login" ? (
            <form
              onSubmit={handleLogin}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <Input
                label="Email"
                type="email"
                placeholder="hello@ribshack.com"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                error={errors.email}
              />
              <Input
                label="Password"
                type={loginShowPw ? "text" : "password"}
                placeholder="Enter your password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                error={errors.password}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setLoginShowPw((v) => !v)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#9CA3AF",
                      padding: 0,
                      display: "flex",
                    }}
                  >
                    {loginShowPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />

              {/* Demo Account Card */}
              <div
                style={{
                  backgroundColor: "#FFFBEB",
                  borderRadius: "20px",
                  padding: "16px",
                  border: "1px solid #FDE68A",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <Flame size={16} color="#D97706" />
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#B45309",
                      letterSpacing: "0.5px",
                    }}
                  >
                    DEMO ACCESS
                  </span>
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
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#92400E",
                      marginBottom: "4px",
                    }}
                  >
                    juan.delacruz@email.com
                  </div>
                  <div
                    style={{
                      fontFamily: "monospace",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "#92400E",
                      marginBottom: "8px",
                    }}
                  >
                    Password123
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#F97316",
                      textTransform: "uppercase",
                    }}
                  >
                    Click to autofill ↑
                  </div>
                </button>
              </div>

              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="lg"
                style={{ marginTop: "8px", borderRadius: "40px" }}
              >
                Sign In
              </Button>
            </form>
          ) : (
            <form
              onSubmit={handleRegister}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <Input
                label="Full Name"
                type="text"
                placeholder="Juan Dela Cruz"
                value={regData.name}
                onChange={(e) =>
                  setRegData({ ...regData, name: e.target.value })
                }
                error={errors.name}
              />
              <Input
                label="Email"
                type="email"
                placeholder="hello@ribshack.com"
                value={regData.email}
                onChange={(e) =>
                  setRegData({ ...regData, email: e.target.value })
                }
                error={errors.email}
              />
              <Input
                label="Mobile Number"
                type="tel"
                placeholder="0917 123 4567"
                value={regData.mobile}
                onChange={(e) =>
                  setRegData({ ...regData, mobile: e.target.value })
                }
                error={errors.mobile}
              />
              <Input
                label="Password"
                type={regShowPw ? "text" : "password"}
                placeholder="Create a strong password"
                value={regData.password}
                onChange={(e) =>
                  setRegData({ ...regData, password: e.target.value })
                }
                error={errors.password}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setRegShowPw((v) => !v)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#9CA3AF",
                      padding: 0,
                      display: "flex",
                    }}
                  >
                    {regShowPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              <Input
                label="Confirm Password"
                type={regShowConfirmPw ? "text" : "password"}
                placeholder="Confirm your password"
                value={regData.confirmPassword}
                onChange={(e) =>
                  setRegData({ ...regData, confirmPassword: e.target.value })
                }
                error={errors.confirmPassword}
                rightSlot={
                  <button
                    type="button"
                    onClick={() => setRegShowConfirmPw((v) => !v)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#9CA3AF",
                      padding: 0,
                      display: "flex",
                    }}
                  >
                    {regShowConfirmPw ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                }
              />

              <Button
                type="submit"
                loading={loading}
                fullWidth
                size="lg"
                style={{ marginTop: "8px", borderRadius: "40px" }}
              >
                Create Account
              </Button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "11px",
                  color: "#9CA3AF",
                  marginTop: "8px",
                  lineHeight: 1.5,
                }}
              >
                By joining, you agree to our{" "}
                <span style={{ fontWeight: 500, color: "#F97316" }}>Terms</span>{" "}
                and{" "}
                <span style={{ fontWeight: 500, color: "#F97316" }}>
                  Privacy Policy
                </span>
              </p>
            </form>
          )}

          {/* Switch Tab Link for Mobile */}
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <p style={{ fontSize: "13px", color: "#6B7280" }}>
              {tab === "login"
                ? "Don't have an account?"
                : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => {
                  setTab(tab === "login" ? "register" : "login");
                  setErrors({});
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#EA580C",
                  fontWeight: 700,
                  fontSize: "13px",
                  padding: 0,
                  textDecoration: "underline",
                }}
              >
                {tab === "login" ? "Sign up now" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
