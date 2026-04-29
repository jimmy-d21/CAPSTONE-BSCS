import { CheckCircle2, AlertTriangle, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ICONS = {
  order_completed: <CheckCircle2 className="size-5 text-green-600" />,
  inventory_alert: <AlertTriangle className="size-5 text-orange-600" />,
  staff_checkin: <Users className="size-5 text-blue-600" />,
};

const RecentActivityFeed = ({ activities, title = "Recent Activity" }) => (
  <Card className="border-0 shadow-lg">
    <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
    <CardContent>
      <div className="space-y-3">
        {activities?.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            {ICONS[activity.type]}
            <div className="flex-1">
              <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(activity.timestamp).toLocaleTimeString("en-PH", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default RecentActivityFeed;
