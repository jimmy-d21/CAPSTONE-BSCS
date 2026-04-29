import { ShoppingCart, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function OrderIcon({ status }) {
  if (status === "completed") return <CheckCircle2 className="size-5 text-green-600" />;
  if (status === "preparing") return <Clock className="size-5 text-orange-600" />;
  return <XCircle className="size-5 text-red-600" />;
}

export default function RecentOrdersCard({ recentOrders }) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="size-5 text-blue-600" />
          Recent Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentOrders.length > 0 ? (
            recentOrders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <OrderIcon status={order.status} />
                  <div>
                    <div className="font-semibold text-gray-900">{order.id}</div>
                    <div className="text-sm text-gray-500">
                      {order.time} • {order.items} items
                    </div>
                  </div>
                </div>
                <div className="font-bold text-gray-900">₱{order.total}</div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">No orders today</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
