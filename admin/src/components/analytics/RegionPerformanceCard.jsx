import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { MapPin } from "lucide-react";

export default function RegionPerformanceCard({ regionPerformance }) {
  if (!regionPerformance) return null;
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="size-5 text-orange-600" />
          Regional Performance
        </CardTitle>
        <CardDescription>Revenue and order distribution across regions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regionPerformance.map((region, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl border-2 hover:shadow-lg transition-all duration-300"
              style={{
                borderColor: region.color,
                background: `linear-gradient(135deg, ${region.color}08 0%, ${region.color}18 100%)`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{region.region}</h3>
                  <p className="text-sm text-gray-500">{region.branches} Branches</p>
                </div>
                <div className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: region.color }}>
                  {region.percentage}%
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Revenue</div>
                  <div className="text-2xl font-bold" style={{ color: region.color }}>
                    ₱{region.revenue.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Orders</div>
                  <div className="text-2xl font-bold text-gray-900">{region.orders}</div>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t">
                  <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                    <TrendingUp className="size-4" />
                    {region.growth}
                  </div>
                  <span className="text-xs text-gray-500">growth rate</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
