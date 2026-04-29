import { Activity } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

const STATUS_CONFIG = [
  { key: "completed", name: "Completed", color: "#10b981" },
  { key: "preparing", name: "Preparing", color: "#f59e0b" },
  { key: "pending",   name: "Pending",   color: "#3b82f6" },
  { key: "cancelled", name: "Cancelled", color: "#ef4444" },
];

export default function OrderStatusChart({ orderStatus }) {
  const data = STATUS_CONFIG.map((s) => ({ ...s, value: orderStatus[s.key] }));

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <Activity className="size-4 text-blue-600" />
          </div>
          Today's Order Status
        </CardTitle>
        <CardDescription>Real-time order breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="50%" height={250}>
            <PieChart>
              <Pie
                data={data.filter((d) => d.value > 0)}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${value} orders`}
                contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {data.map(({ key, name, color, value }) => (
              <div key={key} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
                <span className="text-sm font-medium">{name}: {value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
