import { Outlet, Link, useLocation, useNavigate } from "react-router";
import {
  Home,
  ChefHat,
  Package,
  Menu as MenuIcon,
  Users,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import NotificationBell from "../notifications/NotificationBell";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/kitchen", icon: ChefHat, label: "Kitchen Display" },
    { path: "/inventory", icon: Package, label: "Inventory" },
    { path: "/menu", icon: MenuIcon, label: "Menu Management" },
    { path: "/staff", icon: Users, label: "Staff Roster" },
  ];

  const LOGO_URL =
    "https://imgs.search.brave.com/hWbozxaUVaBFXWHC_C_uy8BIvSKkKx6Sc_QSI2SuXVs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kM3Vw/NDh3c3M2bHZqLmNs/b3VkZnJvbnQubmV0/L2RhdGEvdXBsb2Fk/cy8yMDIxLzAyL1Jp/YnNoYWNrX1NNQkQu/anBn";

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-orange-600 to-red-700 shadow-2xl flex flex-col">
        {/* Logo and Branch Header */}
        <div className="p-6 border-b border-orange-500/50">
          <div className="flex items-center gap-4">
            {/* Image Logo Container */}
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg overflow-hidden border-2 border-white">
              <img
                src={LOGO_URL}
                alt="Ribshack Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Ribshack
              </h1>
              <p className="text-orange-100 text-xs font-semibold uppercase tracking-wider">
                Store Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold ${
                  isActive
                    ? "bg-white text-orange-600 shadow-md transform scale-[1.02]"
                    : "text-white hover:bg-white/10"
                }`}
              >
                <Icon
                  className={`size-5 ${isActive ? "text-orange-600" : "text-orange-100"}`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button at Bottom */}
        <div className="p-4 border-t border-red-800/50">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-white hover:bg-white/10 rounded-xl transition-all font-semibold group"
          >
            <LogOut className="size-5 text-orange-200 group-hover:text-white transition-colors" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-72 flex-1">
        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 px-8 py-3 flex justify-end">
          <NotificationBell />
        </div>
        <div className="p-8 max-w-8xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
