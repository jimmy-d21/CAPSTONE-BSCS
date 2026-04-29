import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";

export default function TopProductsList({ topProducts }) {
  if (!topProducts) return null;
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="size-5 text-orange-600" />
          Best Selling Products
        </CardTitle>
        <CardDescription>Most popular menu items across all locations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topProducts.map((product, index) => (
            <div
              key={product.id}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition-all"
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-white ${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-orange-600" : "bg-gray-300"}`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{product.name}</div>
                <div className="text-sm text-gray-500">{product.category} • {product.sold} sold</div>
                <div className="flex items-center gap-2 mt-1">
                  {product.popularIn.map((region, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                      {region}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-green-600">₱{product.revenue.toLocaleString()}</div>
                <div className="text-xs text-green-600 font-medium">{product.growth}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
