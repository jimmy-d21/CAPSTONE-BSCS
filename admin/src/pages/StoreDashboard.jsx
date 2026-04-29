import { useParams, useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useBranchContext } from "../context/BranchContext";
import StoreHeader from "../components/store/StoreHeader";
import StoreKpiCards from "../components/store/StoreKpiCards";
import WeeklyRevenueChart from "../components/store/WeeklyRevenueChart";
import OrderStatusChart from "../components/store/OrderStatusChart";
import HourlyOrdersChart from "../components/store/HourlyOrdersChart";
import TopProductsCard from "../components/store/TopProductsCard";
import RecentOrdersCard from "../components/store/RecentOrdersCard";
import InventoryAlertsCard from "../components/store/InventoryAlertsCard";

export default function StoreDashboard() {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const { getStoreDashboard, branches } = useBranchContext();

  const storeData = getStoreDashboard(parseInt(branchId));
  const branchInfo = branches.find((b) => b.id === parseInt(branchId));

  if (!storeData || !branchInfo) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Branch not found</h2>
          <Button onClick={() => navigate("/admin/branches")} className="mt-4">
            <ArrowLeft className="size-4 mr-2" />
            Back to Branches
          </Button>
        </div>
      </div>
    );
  }

  const isClosed = branchInfo.status === "closed";

  return (
    <div className="space-y-6">
      <StoreHeader storeData={storeData} branchInfo={branchInfo} />

      <StoreKpiCards todayStats={storeData.todayStats} isClosed={isClosed} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyRevenueChart weeklyRevenue={storeData.weeklyRevenue} />
        <OrderStatusChart orderStatus={storeData.orderStatus} />
      </div>

      {!isClosed && <HourlyOrdersChart hourlyOrders={storeData.hourlyOrders} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsCard topProducts={storeData.topProducts} />
        <div className="space-y-6">
          <RecentOrdersCard recentOrders={storeData.recentOrders} />
          <InventoryAlertsCard inventoryAlerts={storeData.inventoryAlerts} />
        </div>
      </div>
    </div>
  );
}
