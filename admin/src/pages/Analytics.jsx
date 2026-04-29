import { Sparkles } from "lucide-react";
import { useAnalyticsContext } from "../context/AnalyticsContext";
import getCurrentTime from "../utils/getCurrentTime";
import KpiCards from "../components/analytics/KpiCards";
import RegionPerformanceCard from "../components/analytics/RegionPerformanceCard";
import TopBranchesTable from "../components/analytics/TopBranchesTable";
import TopProductsList from "../components/analytics/TopProductsList";
import RevenueAreaChart from "../components/charts/RevenueAreaChart";
import CategoryPieChart from "../components/charts/CategoryPieChart";
import MonthlyComparisonChart from "../components/charts/MonthlyComparisonChart";

export default function Analytics() {
  const { globalAnalytics } = useAnalyticsContext();
  const {
    kpi,
    regionPerformance,
    weeklyRevenue,
    topBranches,
    topProducts,
    salesByCategory,
    monthlyComparison,
  } = globalAnalytics;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg">
            <Sparkles className="size-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">
              Global Analytics
            </h1>
            <p className="text-gray-500 mt-1">
              Real-time performance across all Philippines
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Last Updated</div>
          <div className="font-semibold text-gray-900">{getCurrentTime()}</div>
        </div>
      </div>

      <KpiCards kpi={kpi} />
      <RegionPerformanceCard regionPerformance={regionPerformance} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueAreaChart data={weeklyRevenue} />
        <CategoryPieChart data={salesByCategory} />
      </div>

      <MonthlyComparisonChart data={monthlyComparison} />
      <TopBranchesTable topBranches={topBranches} />
      <TopProductsList topProducts={topProducts} />
    </div>
  );
}
