import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

const RANK_COLORS = ["bg-yellow-500", "bg-gray-400", "bg-orange-600", "bg-gray-300"];

export default function TopProductsCard({ topProducts }) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="size-5 text-yellow-500" />
          Top Selling Products Today
        </CardTitle>
        <CardDescription>Best performing menu items</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topProducts.slice(0, 5).map((product, index) => (
            <div key={index} className="flex items-center gap-4">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${
                  RANK_COLORS[index] ?? "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-500">{product.sold} units sold</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">
                  ₱{product.revenue.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
