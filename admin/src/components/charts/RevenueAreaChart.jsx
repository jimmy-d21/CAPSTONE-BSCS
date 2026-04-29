import { TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

export default function RevenueAreaChart({ data, title = "Weekly Revenue by Region", description = "Last 7 days performance breakdown" }) {
  if (!data) return null;
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-1.5 bg-green-100 rounded-lg">
            <TrendingUp className="size-4 text-green-600" />
          </div>
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorVisayas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorMindanao" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorLuzon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="day" tick={{ fill: "#6b7280" }} />
            <YAxis tick={{ fill: "#6b7280" }} tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
            <Legend />
            <Area type="monotone" dataKey="visayas" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorVisayas)" name="Visayas" />
            <Area type="monotone" dataKey="mindanao" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorMindanao)" name="Mindanao" />
            <Area type="monotone" dataKey="luzon" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorLuzon)" name="Luzon" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
