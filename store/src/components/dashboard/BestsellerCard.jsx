import { Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatCurrency } from "../../utils/formatters";

const BestsellerCard = ({ bestseller }) => (
  <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Trophy className="size-5 text-amber-600" />
        Bestseller of the Day
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-start gap-4">
        <img src={bestseller?.imageUrl} alt={bestseller?.productName} className="w-20 h-20 rounded-lg object-cover shadow-md" />
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-1">{bestseller?.productName}</h3>
          <p className="text-sm text-gray-600 mb-2">{bestseller?.category}</p>
          <div className="flex items-center gap-4">
            <div><p className="text-xs text-gray-500">Sold</p><p className="text-lg font-bold text-orange-600">{bestseller?.quantitySold}</p></div>
            <div><p className="text-xs text-gray-500">Revenue</p><p className="text-lg font-bold text-green-600">{formatCurrency(bestseller?.revenue)}</p></div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default BestsellerCard;
