import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RevenueAreaChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
      <XAxis dataKey="day" tick={{ fill: "#6b7280" }} />
      <YAxis tick={{ fill: "#6b7280" }} />
      <Tooltip
        formatter={(v) => `₱${v.toLocaleString()}`}
        contentStyle={{
          borderRadius: "12px",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      />
      <Area
        type="monotone"
        dataKey="revenue"
        stroke="#10b981"
        strokeWidth={3}
        fillOpacity={1}
        fill="url(#colorRevenue)"
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default RevenueAreaChart;
