import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";

export default function BranchFinanceTable({ branchFinancials, period }) {
  if (!branchFinancials) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Branch Financial Performance{period ? ` (${period})` : ""}
        </CardTitle>
        <CardDescription>
          Individual branch revenue and profitability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                {[
                  "Branch",
                  "Gross Sales",
                  "VAT",
                  "Net Sales",
                  "Expenses",
                  "Profit",
                  "Margin",
                ].map((h, i) => (
                  <th
                    key={i}
                    className={`py-3 px-4 font-semibold text-gray-700 ${i === 0 ? "text-left" : "text-right"}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {branchFinancials.map((branch, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {branch.branch}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-800">
                    ₱{branch.grossSales.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-orange-600">
                    ₱{branch.vat.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-800">
                    ₱{branch.netSales.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-red-600">
                    ₱{branch.expenses.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-green-600 font-semibold">
                    ₱{branch.profit.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-gray-700">
                    {branch.margin.toFixed(1)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
