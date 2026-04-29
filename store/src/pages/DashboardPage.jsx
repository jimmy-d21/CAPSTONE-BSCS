import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { TrendingUp, Clock, Activity } from "lucide-react";
import { useDashboard } from "../context/DashboardContext";
import { useAuth } from "../context/AuthContext";
import KpiCards from "../components/dashboard/KpiCards";
import BestsellerCard from "../components/dashboard/BestsellerCard";
import CategorySalesList from "../components/dashboard/CategorySalesList";
import RecentActivityFeed from "../components/dashboard/RecentActivityFeed";
import RevenueAreaChart from "../components/charts/RevenueAreaChart";
import HourlyBarChart from "../components/charts/HourlyBarChart";
import OrderTypePieChart from "../components/charts/OrderTypePieChart";
import LoadingSpinner from "../components/common/LoadingSpinner";

const DashboardPage = () => {
  const { todayStats, bestsellerOfTheDay, hourlyRevenue, categorySales, recentActivity, isLoading } = useDashboard();
  const { branch } = useAuth();

  if (isLoading) return <LoadingSpinner message="Loading dashboard..." />;

  const orderTypeData = [
    { name: "Dine-in",  value: todayStats?.dineInOrders || 0,                               color: "#10b981" },
    { name: "Delivery", value: todayStats?.deliveryOrders || 0,                              color: "#3b82f6" },
    { name: "Takeout",  value: Math.floor((todayStats?.totalOrders || 0) * 0.15),            color: "#f59e0b" },
  ];

  const weeklyRevenue = [
    { day: "Mon", revenue: 45000 },
    { day: "Tue", revenue: 52000 },
    { day: "Wed", revenue: 48000 },
    { day: "Thu", revenue: 61000 },
    { day: "Fri", revenue: 55000 },
    { day: "Sat", revenue: 67000 },
    { day: "Sun", revenue: todayStats?.grossRevenue || 0 },
  ];

  const categoriesForList = categorySales?.map((cat) => ({
    name: cat.category,
    sold: cat.orders,
    revenue: cat.revenue,
  })) || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-4xl font-bold text-gray-900">{branch?.branchName || "SM Bacolod"}</h1>
          <Badge className="bg-green-500">Open</Badge>
        </div>
        <p className="text-gray-500 mt-1">{branch?.address || "South Wing, South Building, SM City Bacolod"}</p>
      </div>

      {/* KPI Cards */}
      <KpiCards todayStats={todayStats} />

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <TrendingUp className="size-4 text-green-600" />
              </div>
              Weekly Revenue Trend
            </CardTitle>
            <CardDescription>Last 7 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueAreaChart data={weeklyRevenue} />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 rounded-lg">
                <Activity className="size-4 text-blue-600" />
              </div>
              Order Type Distribution
            </CardTitle>
            <CardDescription>Today's order breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <OrderTypePieChart data={orderTypeData} />
              <div className="space-y-3 ml-4">
                {orderTypeData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Revenue Chart */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className="p-1.5 bg-orange-100 rounded-lg">
              <Clock className="size-4 text-orange-600" />
            </div>
            Hourly Revenue Distribution
          </CardTitle>
          <CardDescription>Peak hours and revenue patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <HourlyBarChart data={hourlyRevenue} />
        </CardContent>
      </Card>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategorySalesList categories={categoriesForList} />

        <div className="space-y-6">
          <RecentActivityFeed activities={recentActivity} title="Recent Orders" />
          {bestsellerOfTheDay && <BestsellerCard bestseller={bestsellerOfTheDay} />}
        </div>
      </div>

      {/* Full Activity Feed */}
      <RecentActivityFeed activities={recentActivity} title="Recent Activity" />
    </div>
  );
};

export default DashboardPage;
