import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HourlyBarChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
      <XAxis dataKey="hour" tick={{ fill: "#6b7280" }} />
      <YAxis tick={{ fill: "#6b7280" }} />
      <Tooltip
        formatter={(v) => `₱${v.toLocaleString()}`}
        contentStyle={{
          borderRadius: "12px",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      />
      <Bar dataKey="revenue" fill="#f97316" radius={[8, 8, 0, 0]} />
    </BarChart>
  </ResponsiveContainer>
);

export default HourlyBarChart;
