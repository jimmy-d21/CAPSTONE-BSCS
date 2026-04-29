import { BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

export default function MonthlyComparisonChart({ data, title = "Monthly Revenue Comparison", description = "Current year vs previous year" }) {
  if (!data) return null;
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-100 rounded-lg">
            <BarChart3 className="size-4 text-orange-600" />
          </div>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fill: "#6b7280" }} />
            <YAxis tick={{ fill: "#6b7280" }} tickFormatter={(v) => `₱${(v / 1000000).toFixed(1)}M`} />
            <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
            <Legend />
            <Bar dataKey="previous" fill="#cbd5e1" name="2025" radius={[8, 8, 0, 0]} />
            <Bar dataKey="current" fill="#f97316" name="2026" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
