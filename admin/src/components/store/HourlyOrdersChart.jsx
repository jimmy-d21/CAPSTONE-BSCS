import { Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

export default function HourlyOrdersChart({ hourlyOrders }) {
  if (!hourlyOrders || hourlyOrders.length === 0) return null;

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="size-5 text-orange-600" />
          Hourly Order Distribution
        </CardTitle>
        <CardDescription>Peak hours and order patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={hourlyOrders}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="hour" tick={{ fill: "#6b7280" }} />
            <YAxis tick={{ fill: "#6b7280" }} />
            <Tooltip
              formatter={(value) => `${value} orders`}
              contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            />
            <Bar dataKey="orders" fill="#f97316" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
