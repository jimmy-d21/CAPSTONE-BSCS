import { TrendingUp, Award } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

export default function TopBranchesTable({ topBranches }) {
  if (!topBranches) return null;
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="size-5 text-yellow-500" />
          Top 10 Performing Branches
        </CardTitle>
        <CardDescription>Highest revenue generators today</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                {["Rank", "Branch", "Location", "Region", "Revenue", "Orders", "Growth", "Rating"].map((h, i) => (
                  <th key={i} className={`py-4 px-4 font-semibold text-gray-700 ${i >= 4 ? "text-right" : i === 7 ? "text-center" : "text-left"}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {topBranches.map((branch, index) => (
                <tr key={branch.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-orange-600" : "bg-gray-300"}`}>
                      {index + 1}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-gray-900">{branch.name}</div>
                    {branch.note && <div className="text-xs text-orange-600 font-medium">{branch.note}</div>}
                  </td>
                  <td className="py-4 px-4 text-gray-600">{branch.location}</td>
                  <td className="py-4 px-4">
                    <Badge className={branch.region === "Visayas" ? "bg-green-100 text-green-700" : branch.region === "Mindanao" ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"}>
                      {branch.region}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-green-600">₱{branch.revenue.toLocaleString()}</td>
                  <td className="py-4 px-4 text-right font-semibold">{branch.orders}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1 text-sm font-semibold text-green-600">
                      <TrendingUp className="size-4" />
                      {branch.growth}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold">{branch.rating}</span>
                    </div>
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
