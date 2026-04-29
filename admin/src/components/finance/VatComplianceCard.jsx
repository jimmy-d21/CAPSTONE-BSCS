import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { FileText } from "lucide-react";

export default function VatComplianceCard({ vatReports, onGenerateBIR }) {
  if (!vatReports) return null;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>VAT Compliance Report</CardTitle>
            <CardDescription>12% VAT collection and BIR filing status</CardDescription>
          </div>
          {onGenerateBIR && (
            <Button onClick={onGenerateBIR} className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <FileText className="size-4 mr-2" />
              Generate BIR Form
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                {["Period", "Gross Sales", "VAT Collected", "VAT Payable", "Status", "Filed Date"].map((h, i) => (
                  <th key={i} className={`py-3 px-4 font-semibold text-gray-700 ${i === 0 ? "text-left" : i >= 4 ? "text-center" : "text-right"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {vatReports.map((report, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-900">{report.period}</td>
                  <td className="py-3 px-4 text-right text-gray-800">₱{report.grossSales.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-orange-600">₱{report.vatCollected.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-red-600">₱{report.vatPayable.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge className={report.status === "Filed" ? "bg-green-500" : "bg-yellow-500"}>{report.status}</Badge>
                  </td>
                  <td className="py-3 px-4 text-center text-gray-600">{report.filedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
