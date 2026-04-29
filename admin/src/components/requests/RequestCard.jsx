import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Package, CheckCircle2, XCircle, Clock } from "lucide-react";
import PriorityBadge from "./PriorityBadge";
import RequestItemsList from "./RequestItemsList";

function StatusBadge({ status }) {
  switch (status) {
    case "pending":  return <Badge className="bg-orange-500"><Clock className="size-3 mr-1" />Pending</Badge>;
    case "approved": return <Badge className="bg-green-500"><CheckCircle2 className="size-3 mr-1" />Approved</Badge>;
    case "declined": return <Badge className="bg-red-500"><XCircle className="size-3 mr-1" />Declined</Badge>;
    default:         return null;
  }
}

export default function RequestCard({ request, onApprove, onDecline }) {
  return (
    <Card className={request.status === "pending" ? "border-l-4 border-l-orange-500" : ""}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-lg ${request.status === "pending" ? "bg-orange-100" : "bg-gray-100"}`}>
              <Package className={`size-6 ${request.status === "pending" ? "text-orange-600" : "text-gray-600"}`} />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <CardTitle className="text-lg">{request.branch}</CardTitle>
                <StatusBadge status={request.status} />
                <PriorityBadge priority={request.priority} />
              </div>
              <CardDescription className="mt-1">Requested: {request.requestedAt}</CardDescription>
            </div>
          </div>
          {request.status === "pending" && (
            <div className="flex gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => onApprove?.(request)}>
                <CheckCircle2 className="size-4 mr-2" />Approve
              </Button>
              <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => onDecline?.(request)}>
                <XCircle className="size-4 mr-2" />Decline
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <RequestItemsList items={request.items} />
        <div>
          <h4 className="font-medium mb-2 text-sm">Branch Notes:</h4>
          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">{request.notes}</p>
        </div>
        {request.status !== "pending" && request.adminNotes && (
          <div className={`border-t pt-4 ${request.status === "approved" ? "border-green-200" : "border-red-200"}`}>
            <div className="flex items-center gap-2 mb-2">
              {request.status === "approved"
                ? <CheckCircle2 className="size-5 text-green-600" />
                : <XCircle className="size-5 text-red-600" />}
              <h4 className="font-medium text-sm">
                {request.status === "approved" ? "Approved" : "Declined"}
                {request.respondedAt ? ` on ${request.respondedAt}` : ""}
              </h4>
            </div>
            <p className={`text-sm p-3 rounded-lg ${request.status === "approved" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
              <strong>Admin Notes:</strong> {request.adminNotes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
