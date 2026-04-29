import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

export default function MonthlyTable({ monthlyData }) {
  if (!monthlyData) return null;
  const totalYTD = monthlyData.reduce((s, m) => s + m.grossSales, 0);
  const totalVAT = monthlyData.reduce((s, m) => s + m.vat, 0);
  const totalNet = monthlyData.reduce((s, m) => s + m.netSales, 0);
  const totalExp = monthlyData.reduce((s, m) => s + m.expenses, 0);
  const totalProfit = monthlyData.reduce((s, m) => s + m.profit, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Financial Summary</CardTitle>
        <CardDescription>Detailed breakdown of revenue, VAT, expenses, and profit</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                {["Period", "Gross Sales", "VAT (12%)", "Net Sales", "Expenses", "Net Profit", "Margin"].map((h, i) => (
                  <th key={i} className={`py-3 px-4 font-semibold text-gray-700 ${i === 0 ? "text-left" : "text-right"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((data, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900">{data.month}</td>
                  <td className="py-3 px-4 text-right text-gray-800">₱{data.grossSales.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-orange-600 font-medium">₱{data.vat.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-800">₱{data.netSales.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-red-600">₱{data.expenses.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-green-600 font-semibold">₱{data.profit.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-700">{((data.profit / data.grossSales) * 100).toFixed(1)}%</td>
                </tr>
              ))}
              <tr className="bg-gray-100 font-bold border-t-2 border-gray-300">
                <td className="py-3 px-4 text-gray-900">TOTAL YTD</td>
                <td className="py-3 px-4 text-right">₱{totalYTD.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-orange-600">₱{totalVAT.toLocaleString()}</td>
                <td className="py-3 px-4 text-right">₱{totalNet.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-red-600">₱{totalExp.toLocaleString()}</td>
                <td className="py-3 px-4 text-right text-green-600">₱{totalProfit.toLocaleString()}</td>
                <td className="py-3 px-4 text-right">{((totalProfit / totalYTD) * 100).toFixed(1)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
