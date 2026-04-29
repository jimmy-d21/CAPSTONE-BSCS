import { TrendingUp, DollarSign, Store, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const kpiConfig = [
  {
    key: "totalRevenue",
    label: "Total Revenue Today",
    icon: DollarSign,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    cardBg: "from-green-50 to-emerald-50",
    trendKey: "revenue",
    trendColor: "text-green-600 bg-green-100",
    format: (v) => `₱${v.toLocaleString()}`,
    note: "vs yesterday",
  },
  {
    key: "totalOrders",
    label: "Total Orders",
    icon: ShoppingCart,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    cardBg: "from-blue-50 to-cyan-50",
    trendKey: "orders",
    trendColor: "text-blue-600 bg-blue-100",
    format: (v) => v.toLocaleString(),
    note: "vs yesterday",
  },
  {
    key: "activeStores",
    label: "Active Stores",
    icon: Store,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    cardBg: "from-orange-50 to-red-50",
    trendKey: null,
    format: (v) => v,
    note: "Nationwide operations",
  },
  {
    key: "avgOrderValue",
    label: "Avg Order Value",
    icon: TrendingUp,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    cardBg: "from-purple-50 to-pink-50",
    trendKey: "avgOrder",
    trendColor: "text-purple-600 bg-purple-100",
    format: (v) => `₱${v.toFixed(2)}`,
    note: "per transaction",
  },
];

export default function KpiCards({ kpi }) {
  if (!kpi) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiConfig.map(({ key, label, icon: Icon, iconBg, iconColor, cardBg, trendKey, trendColor, format, note }) => (
        <Card key={key} className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br ${cardBg}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{label}</CardTitle>
            <div className={`p-2 ${iconBg} rounded-lg`}>
              <Icon className={`size-5 ${iconColor}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{format(kpi[key])}</div>
            <div className="flex items-center gap-1.5 mt-2">
              {trendKey && kpi.trends?.[trendKey] ? (
                <>
                  <div className={`flex items-center gap-1 text-sm font-medium ${trendColor} px-2 py-0.5 rounded-full`}>
                    <TrendingUp className="size-3.5" />
                    {kpi.trends[trendKey]}
                  </div>
                  <span className="text-xs text-gray-500">{note}</span>
                </>
              ) : (
                <span className="text-xs text-gray-500 font-medium">{note}</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
