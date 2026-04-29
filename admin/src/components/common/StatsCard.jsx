import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function StatsCard({ title, value, icon: Icon, iconColor = "text-gray-500", valueColor = "text-gray-900", subtitle }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-gray-600 flex items-center gap-2">
          {Icon && <Icon className={`size-4 ${iconColor}`} />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${valueColor}`}>{value}</div>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}
