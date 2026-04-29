import { AlertTriangle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function InventoryAlertsCard({ inventoryAlerts }) {
  if (!inventoryAlerts || inventoryAlerts.length === 0) return null;

  return (
    <Card className="border-0 shadow-lg border-l-4 border-l-orange-500">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-orange-600" />
          Inventory Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {inventoryAlerts.map((alert, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                alert.status === "critical"
                  ? "bg-red-50 border border-red-200"
                  : "bg-orange-50 border border-orange-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{alert.item}</div>
                  <div className="text-sm text-gray-600">
                    Current: {alert.current} | Min: {alert.minimum}
                  </div>
                </div>
                <Badge className={alert.status === "critical" ? "bg-red-500" : "bg-orange-500"}>
                  {alert.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
