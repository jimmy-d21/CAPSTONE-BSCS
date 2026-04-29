import { PieChart, Pie, Cell, Tooltip } from "recharts";

const OrderTypePieChart = ({ data }) => (
  <PieChart width={250} height={250}>
    <Pie
      data={data}
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
      formatter={(v) => `${v} orders`}
      contentStyle={{
        borderRadius: "12px",
        border: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    />
  </PieChart>
);

export default OrderTypePieChart;
