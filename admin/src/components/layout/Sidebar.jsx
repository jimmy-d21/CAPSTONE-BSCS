import { useNavigate, useLocation } from "react-router";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import {
  LayoutDashboard,
  Store,
  Inbox,
  Package,
  LogOut,
  Receipt,
} from "lucide-react";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("ribshack_admin_auth");
    navigate("/login");
  };

  const menuItems = [
    {
      path: "/admin/analytics",
      icon: LayoutDashboard,
      label: "Global Analytics",
    },
    { path: "/admin/branches", icon: Store, label: "Branch Management" },
    { path: "/admin/requests", icon: Inbox, label: "Request Center" },
    { path: "/admin/products", icon: Package, label: "Product Catalog" },
    { path: "/admin/finance", icon: Receipt, label: "Finance Reports" },
  ];

  return (
    <aside
      className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-72 bg-gradient-to-b from-orange-600 via-red-600 to-red-700 text-white
        transform transition-transform duration-300 ease-in-out shadow-2xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-6 border-b border-orange-500/30">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/40 blur-lg rounded-xl opacity-40" />
              <div className="relative bg-white p-2 rounded-xl shadow-lg">
                <img
                  src="https://imgs.search.brave.com/hWbozxaUVaBFXWHC_C_uy8BIvSKkKx6Sc_QSI2SuXVs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kM3Vw/NDh3c3M2bHZqLmNs/b3VkZnJvbnQubmV0/L2RhdGEvdXBsb2Fk/cy8yMDIxLzAyL1Jp/YnNoYWNrX1NNQkQu/anBn"
                  alt="Ribshack Logo"
                  className="w-12 h-12 object-contain rounded-lg"
                />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Ribshack</h1>
              <p className="text-xs text-orange-100">HQ Control Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.path === "/admin/branches"
                  ? location.pathname.startsWith("/admin/branches")
                  : location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3.5 rounded-xl
                    transition-all duration-200 group
                    ${
                      isActive
                        ? "bg-white text-orange-600 font-semibold shadow-lg scale-105"
                        : "text-orange-50 hover:bg-white/10 hover:translate-x-1"
                    }
                  `}
                >
                  <Icon
                    className={`size-5 ${isActive ? "text-orange-600" : "group-hover:text-white"}`}
                  />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Logout */}
        <div className="p-4 border-t border-orange-500/30 bg-black/10">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/10 h-12 rounded-xl group"
          >
            <LogOut className="size-5 mr-3 group-hover:rotate-12 transition-transform" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
}
