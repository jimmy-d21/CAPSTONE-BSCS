import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { AlertCircle, LogIn, Lock, User, Info, Building2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label"; // Assuming a simple label component

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login(username, password);
      if (result.success) {
        navigate("/");
      } else {
        setError(
          result.error || "Access denied. Please check your credentials.",
        );
      }
    } catch (err) {
      setError("System connection interrupted. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setUsername("sm_bacolod_user");
    setPassword("ribshack123");
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center p-4">
      {/* Organic background curve */}
      <div className="absolute top-0 left-0 w-full h-[45%] bg-[#D35400] -skew-y-3 origin-top-left -z-10" />

      <div className="w-full max-w-[960px] bg-white rounded-3xl shadow-[0_15px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Panel: Branding & Welcome */}
          <div className="w-full md:w-1/2 p-12 md:p-16 flex flex-col justify-between text-center md:text-left">
            <div>
              <div className="inline-block p-1 bg-white rounded-3xl shadow-sm mb-6 border border-gray-100">
                <img
                  src="https://imgs.search.brave.com/hWbozxaUVaBFXWHC_C_uy8BIvSKkKx6Sc_QSI2SuXVs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kM3Vw/NDh3c3M2bHZqLmNs/b3VkZnJvbnQubmV0/L2RhdGEvdXBsb2Fk/cy8yMDIxLzAyL1Jp/YnNoYWNrX1NNQkQu/anBn"
                  alt="Ribshack Logo"
                  className="w-24 h-24 rounded-[20px] object-contain"
                />
              </div>
              <h1 className="text-5xl font-extrabold text-[#D35400] tracking-tighter leading-tight mb-4">
                Operations <span className="text-[#A04000]">Dashboard</span>
              </h1>
              <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-sm mx-auto md:mx-0">
                Welcome to the central portal for all Ribshack store management.
              </p>
            </div>

            <p className="text-sm text-gray-400 mt-12 md:mt-0 font-medium">
              Only authorized branch credentials allowed.
              <br /> Contact IT Support for access issues.
            </p>
          </div>

          {/* Right Panel: The Form */}
          <div className="w-full md:w-1/2 p-12 md:p-16 bg-gray-50/50 border-t md:border-t-0 md:border-l border-gray-100">
            <div className="flex items-center gap-3 mb-12">
              <Building2 className="size-7 text-[#A04000]" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900">
                  Branch Sign-In
                </h2>
                <p className="text-gray-500 text-sm">
                  Please provide your store credentials
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-8 p-5 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-4">
                <AlertCircle className="size-6 text-red-500 flex-shrink-0" />
                <p className="text-sm text-red-700 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm font-bold tracking-wide text-gray-800 ml-1">
                  Username
                </Label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-[#D35400] transition-colors" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="e.g. sm_bacolod_user"
                    className="w-full pl-14 pr-5 py-4 bg-gray-100 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#D35400]/10 focus:border-[#D35400] focus:bg-white hover:shadow-inner transition-all outline-none text-gray-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-bold tracking-wide text-gray-800 ml-1">
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-400 group-focus-within:text-[#D35400] transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-14 pr-5 py-4 bg-gray-100 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-[#D35400]/10 focus:border-[#D35400] focus:bg-white hover:shadow-inner transition-all outline-none text-gray-800"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-7 bg-[#D35400] hover:bg-[#A04000] text-white font-bold rounded-2xl shadow-xl shadow-[#D35400]/20 transition-all active:scale-[0.97] text-md"
              >
                {isLoading ? "Signing in..." : "Access Dashboard"}
              </Button>
            </form>

            {/* Subtle Demo Feature */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <Info className="size-4 text-gray-400" />
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  Training Simulator
                </span>
              </div>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="w-full py-3.5 bg-gray-100/50 hover:bg-gray-100 text-gray-500 hover:text-gray-800 rounded-2xl transition-all text-xs font-semibold"
              >
                Auto-fill test credentials
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
