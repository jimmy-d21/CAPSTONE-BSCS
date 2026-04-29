import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Lock, User, Eye, EyeOff, ShieldCheck, Info } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (
        credentials.username === "admin" &&
        credentials.password === "ribshack2024"
      ) {
        localStorage.setItem("ribshack_admin_auth", "true");
        toast.success("Welcome back to Ribshack HQ 🔥");
        navigate("/admin/analytics");
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
      setLoading(false);
    }, 800);
  };

  const fillDemo = () => {
    setCredentials({
      username: "admin",
      password: "ribshack2024",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-to-r from-orange-600 to-red-600 -skew-y-3 origin-top-left -z-10 shadow-2xl" />

      {/* Main Container - Animations removed from className */}
      <div className="w-full max-w-[960px] bg-white rounded-3xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.15)] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* LEFT SIDE (Branding) */}
          <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-between text-center md:text-left bg-white">
            <div>
              <div className="inline-block p-2 bg-white rounded-3xl shadow-lg mb-8 border border-gray-100">
                <img
                  src="https://imgs.search.brave.com/hWbozxaUVaBFXWHC_C_uy8BIvSKkKx6Sc_QSI2SuXVs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kM3Vw/NDh3c3M2bHZqLmNs/b3VkZnJvbnQubmV0/L2RhdGEvdXBsb2Fk/cy8yMDIxLzAyL1Jp/YnNoYWNrX1NNQkQu/anBn"
                  alt="Ribshack Logo"
                  className="w-24 h-24 rounded-[20px] object-contain"
                />
              </div>

              <h1 className="text-5xl font-extrabold text-[#D35400] leading-tight mb-4 tracking-tight">
                Ribshack <span className="text-[#A04000]">HQ</span>
              </h1>

              <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
                Centralized admin system for real-time analytics, inventory
                management, and corporate operations.
              </p>
            </div>

            <div className="mt-12 md:mt-0">
              <div className="h-1 w-12 bg-orange-200 mb-4 mx-auto md:mx-0 rounded-full"></div>
              <p className="text-sm text-gray-400 font-medium italic">
                Authorized personnel only. Access is monitored.
                <br />
                System v2.0.26
              </p>
            </div>
          </div>

          {/* RIGHT SIDE (Login Form) */}
          <div className="w-full md:w-1/2 p-10 md:p-16 bg-gray-50/80 border-t md:border-t-0 md:border-l border-gray-100">
            {/* HEADER */}
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 bg-[#A04000]/10 rounded-xl">
                <ShieldCheck className="size-7 text-[#A04000]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Admin Login
                </h2>
                <p className="text-gray-500 text-sm">
                  Secure Management Portal
                </p>
              </div>
            </div>

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* USERNAME */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-gray-700 ml-1">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
                  <input
                    type="text"
                    value={credentials.username}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }
                    placeholder="Enter HQ username"
                    className="w-full pl-14 pr-5 py-4 bg-white border border-gray-200 rounded-2xl focus:border-[#D35400] outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="space-y-2">
                <Label className="text-sm font-bold text-gray-700 ml-1">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    placeholder="••••••••"
                    className="w-full pl-14 pr-12 py-4 bg-white border border-gray-200 rounded-2xl focus:border-[#D35400] outline-none transition-colors"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#D35400] p-1 rounded-md"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* SIGN IN BUTTON */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-7 bg-gradient-to-r from-[#D35400] to-[#A04000] text-white font-bold rounded-2xl shadow-md disabled:opacity-70"
              >
                {loading ? "Authenticating..." : "Sign In to Dashboard"}
              </Button>
            </form>

            {/* DEMO ACCESS */}
            <div className="mt-12 pt-8 border-t border-gray-200/60">
              <div className="flex items-center gap-2 mb-4">
                <Info className="size-4 text-gray-400" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                  System Quick Access
                </span>
              </div>

              <button
                type="button"
                onClick={fillDemo}
                className="w-full py-3 bg-white border border-gray-200 hover:bg-orange-50 rounded-2xl text-sm font-semibold text-gray-600 transition-colors"
              >
                Use Demo Credentials
              </button>

              <div className="flex justify-center gap-3 mt-4">
                <span className="px-2 py-1 bg-gray-100 rounded text-[11px] font-mono text-gray-500">
                  User: admin
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded text-[11px] font-mono text-gray-500">
                  Pass: ribshack2024
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
