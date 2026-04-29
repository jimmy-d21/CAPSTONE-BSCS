import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { formatCurrency } from "../../utils/formatters";

const CategorySalesList = ({ categories }) => (
  <Card className="border-0 shadow-lg">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <div className="p-1.5 bg-yellow-100 rounded-lg"><Trophy className="size-4 text-yellow-600" /></div>
        Top Selling Categories Today
      </CardTitle>
      <CardDescription>Best performing menu categories</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {categories?.slice(0, 5).map((cat, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-white ${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-orange-600" : "bg-gray-300"}`}>
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-900">{cat.name || cat.category}</div>
              <div className="text-sm text-gray-500">{cat.sold || cat.orders} orders</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-green-600">{formatCurrency(cat.revenue)}</div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default CategorySalesList;
