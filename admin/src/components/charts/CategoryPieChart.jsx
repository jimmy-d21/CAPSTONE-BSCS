import { ShoppingCart } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

export default function CategoryPieChart({ data, title = "Sales by Category", description = "Product category distribution" }) {
  if (!data) return null;
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 bg-blue-100 rounded-lg">
            <ShoppingCart className="size-4 text-blue-600" />
          </div>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-8">
          <ResponsiveContainer width="50%" height={300}>
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="value">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                <div>
                  <div className="font-semibold text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">₱{item.value.toLocaleString()} ({item.percentage}%)</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
