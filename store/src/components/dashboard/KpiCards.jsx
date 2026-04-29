import {
  DollarSign,
  ShoppingCart,
  BarChart3,
  Store,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "../../utils/formatters";

const KpiCards = ({ todayStats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Today's Revenue
        </CardTitle>
        <div className="p-2 bg-green-100 rounded-lg">
          <DollarSign className="size-5 text-green-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">
          {formatCurrency(todayStats?.grossRevenue || 0)}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
            <TrendingUp className="size-3.5" />
            +14.3%
          </div>
          <span className="text-xs text-gray-500">vs yesterday</span>
        </div>
      </CardContent>
    </Card>
    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Total Orders
        </CardTitle>
        <div className="p-2 bg-blue-100 rounded-lg">
          <ShoppingCart className="size-5 text-blue-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">
          {todayStats?.totalOrders || 0}
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex items-center gap-1 text-sm font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
            <TrendingUp className="size-3.5" />
            +7.7%
          </div>
          <span className="text-xs text-gray-500">vs yesterday</span>
        </div>
      </CardContent>
    </Card>
    <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Avg Order Value
        </CardTitle>
        <div className="p-2 bg-orange-100 rounded-lg">
          <BarChart3 className="size-5 text-orange-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">
          {formatCurrency(todayStats?.avgOrderValue || 0)}
        </div>
        <p className="text-xs text-gray-500 mt-2 font-medium">
          Per customer transaction
        </p>
      </CardContent>
    </Card>
    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          Dine-in Orders
        </CardTitle>
        <div className="p-2 bg-purple-100 rounded-lg">
          <Store className="size-5 text-purple-600" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-gray-900">
          {todayStats?.dineInOrders || 0}
        </div>
        <p className="text-xs text-gray-500 mt-2 font-medium">
          {Math.round(
            ((todayStats?.dineInOrders || 0) / (todayStats?.totalOrders || 1)) *
              100,
          )}
          % of total orders
        </p>
      </CardContent>
    </Card>
  </div>
);

export default KpiCards;
