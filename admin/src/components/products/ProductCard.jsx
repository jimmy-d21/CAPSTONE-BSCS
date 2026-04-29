import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Edit, Trash2, UtensilsCrossed } from "lucide-react";
import UnliRiceBadge from "./UnliRiceBadge";

export default function ProductCard({ product, getCategoryIcon, onEdit, onDelete, onToggleUnliRice }) {
  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      {product.image && (
        <div className="relative h-48 overflow-hidden bg-gray-100">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" />
          {product.popular && (
            <Badge className="absolute top-2 right-2 bg-orange-500 text-white">🔥 Popular</Badge>
          )}
        </div>
      )}
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl">{getCategoryIcon?.(product.category)}</span>
              <Badge variant="outline">{product.category}</Badge>
              {!product.image && product.popular && (
                <Badge className="bg-orange-100 text-orange-700 text-xs">Popular</Badge>
              )}
              <UnliRiceBadge enabled={product.unliRice} />
            </div>
            <CardTitle className="text-lg mt-2">{product.name}</CardTitle>
            <CardDescription className="mt-1">{product.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-green-600">₱{product.price}</span>
          <span className="text-sm text-gray-500">per serving</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="size-4 text-orange-600" />
            <span className="text-sm font-medium">Unli-Rice</span>
          </div>
          <Switch checked={product.unliRice} onCheckedChange={() => onToggleUnliRice?.(product.id)} />
        </div>
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit?.(product)}>
            <Edit className="size-4 mr-2" />Edit
          </Button>
          <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => onDelete?.(product)}>
            <Trash2 className="size-4 mr-2" />Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
