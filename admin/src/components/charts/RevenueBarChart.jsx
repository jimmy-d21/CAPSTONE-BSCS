import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

export default function RevenueBarChart({ data, title = "Revenue", description = "", dataKeys = [{ key: "revenue", color: "#f97316", name: "Revenue" }], yFormatter }) {
  if (!data) return null;
  const defaultYFmt = yFormatter || ((v) => `₱${(v / 1000).toFixed(0)}k`);
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-100 rounded-lg">
            <BarChart3 className="size-4 text-orange-600" />
          </div>
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 11 }} />
            <YAxis tick={{ fill: "#6b7280" }} tickFormatter={defaultYFmt} />
            <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
            <Legend />
            {dataKeys.map(({ key, color, name }) => (
              <Bar key={key} dataKey={key} fill={color} name={name} radius={[4, 4, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
