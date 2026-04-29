import { TrendingUp, DollarSign, ShoppingCart, Users, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const KPI_CONFIG = [
  {
    key: "revenue",
    label: "Today's Revenue",
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    cardBg: "from-green-50 to-emerald-50",
    format: (v) => `₱${v.toLocaleString()}`,
    trend: "+14.3%",
    trendColor: "text-green-600 bg-green-100",
    note: "vs yesterday",
  },
  {
    key: "orders",
    label: "Total Orders",
    icon: ShoppingCart,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    cardBg: "from-blue-50 to-cyan-50",
    format: (v) => v,
    trend: "+7.7%",
    trendColor: "text-blue-600 bg-blue-100",
    note: "vs yesterday",
  },
  {
    key: "avgOrderValue",
    label: "Avg Order Value",
    icon: BarChart3,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    cardBg: "from-orange-50 to-red-50",
    format: (v) => `₱${v}`,
    trend: null,
    note: "Per customer transaction",
  },
  {
    key: "customers",
    label: "Customers Served",
    icon: Users,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    cardBg: "from-purple-50 to-pink-50",
    format: (v) => v,
    trend: null,
    note: "Unique customers today",
  },
];

export default function StoreKpiCards({ todayStats, isClosed }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {KPI_CONFIG.map(({ key, label, icon: Icon, iconBg, iconColor, cardBg, format, trend, trendColor, note }) => (
        <Card
          key={key}
          className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${cardBg}`}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{label}</CardTitle>
            <div className={`p-2 ${iconBg} rounded-lg`}>
              <Icon className={`size-5 ${iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">
              {format(todayStats[key])}
            </div>
            {!isClosed && trend ? (
              <div className="flex items-center gap-1.5 mt-2">
                <div className={`flex items-center gap-1 text-sm font-medium ${trendColor} px-2 py-0.5 rounded-full`}>
                  <TrendingUp className="size-3.5" />
                  {trend}
                </div>
                <span className="text-xs text-gray-500">{note}</span>
              </div>
            ) : (
              <p className="text-xs text-gray-500 mt-2 font-medium">{note}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
