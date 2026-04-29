// TopBar component for the dashboard layout
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

export default function TopBar({ setSidebarOpen }) {
  return (
    <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setSidebarOpen(true)}
        className="p-2"
      >
        <Menu className="size-5" />
      </Button>
      <div className="flex items-center gap-2">
        <img
          src="https://imgs.search.brave.com/hWbozxaUVaBFXWHC_C_uy8BIvSKkKx6Sc_QSI2SuXVs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kM3Vw/NDh3c3M2bHZqLmNs/b3VkZnJvbnQubmV0/L2RhdGEvdXBsb2Fk/cy8yMDIxLzAyL1Jp/YnNoYWNrX1NNQkQu/anBn"
          alt="Ribshack Logo"
          className="w-8 h-8 object-contain"
        />
        <span className="font-semibold text-gray-900">Ribshack HQ</span>
      </div>
    </header>
  );
}
