import {
  DollarSign,
  TrendingUp,
  Building2,
  Receipt,
  Download,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { useFinanceContext } from "../context/FinanceContext";
import MonthlyTable from "../components/finance/MonthlyTable";
import BranchFinanceTable from "../components/finance/BranchFinanceTable";
import VatComplianceCard from "../components/finance/VatComplianceCard";
import ExportButtons from "../components/finance/ExportButtons";
import StatsCard from "../components/common/StatsCard";

export default function FinanceReports() {
  const { financeData } = useFinanceContext();
  const { monthlyData, branchFinancials, vatReports } = financeData;

  const handleExport = (reportType) =>
    toast.success(`Exporting ${reportType}...`);

  const currentMonth = monthlyData[monthlyData.length - 1];
  const totalYTD = monthlyData.reduce((sum, m) => sum + m.grossSales, 0);
  const totalVATYTD = monthlyData.reduce((sum, m) => sum + m.vat, 0);
  const totalProfitYTD = monthlyData.reduce((sum, m) => sum + m.profit, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Finance & VAT Reports
          </h1>
          <p className="text-gray-500 mt-1">
            Sales reports, tax compliance, and financial analytics
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleExport("Monthly Sales Report")}
          >
            <Download className="size-4 mr-2" />
            Export Sales
          </Button>
          <Button variant="outline" onClick={() => handleExport("VAT Report")}>
            <Download className="size-4 mr-2" />
            Export VAT
          </Button>
        </div>
      </div>

      {/* KPI Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title={`${currentMonth.month} Gross Sales`}
          value={`₱${currentMonth.grossSales.toLocaleString()}`}
          icon={DollarSign}
          iconColor="text-green-600"
          subtitle="+11.8% from previous month"
        />
        <StatsCard
          title="YTD Gross Sales"
          value={`₱${totalYTD.toLocaleString()}`}
          icon={Building2}
          iconColor="text-blue-600"
          subtitle={`January – ${currentMonth.month.split(" ")[0]} ${currentMonth.month.split(" ")[1]}`}
        />
        <StatsCard
          title="YTD VAT Collected"
          value={`₱${totalVATYTD.toLocaleString()}`}
          icon={Receipt}
          iconColor="text-orange-600"
          subtitle="12% VAT on sales"
        />
        <StatsCard
          title="YTD Net Profit"
          value={`₱${totalProfitYTD.toLocaleString()}`}
          icon={TrendingUp}
          iconColor="text-purple-600"
          valueColor="text-green-600"
          subtitle={`${((totalProfitYTD / totalYTD) * 100).toFixed(1)}% profit margin`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue & Profit Trend</CardTitle>
            <CardDescription>
              Gross sales vs net profit comparison
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: "#6b7280" }}
                  tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="grossSales"
                  stroke="#f97316"
                  strokeWidth={2}
                  name="Gross Sales"
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Net Profit"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Financial Breakdown</CardTitle>
            <CardDescription>
              Sales, expenses, and profit — last 3 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData.slice(-3)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280", fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: "#6b7280" }}
                  tickFormatter={(v) => `₱${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip formatter={(value) => `₱${value.toLocaleString()}`} />
                <Legend />
                <Bar
                  dataKey="grossSales"
                  fill="#3b82f6"
                  name="Gross Sales"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="expenses"
                  fill="#ef4444"
                  name="Expenses"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="profit"
                  fill="#10b981"
                  name="Profit"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <MonthlyTable monthlyData={monthlyData} />
      <BranchFinanceTable
        branchFinancials={branchFinancials}
        period={currentMonth.month}
      />
      <VatComplianceCard
        vatReports={vatReports}
        onGenerateBIR={() => handleExport("BIR VAT Return Form")}
      />
      <ExportButtons onExport={handleExport} />
    </div>
  );
}
