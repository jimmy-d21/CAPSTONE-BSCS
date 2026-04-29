import { Clock } from "lucide-react";

const PendingRequestsList = ({ requests }) => (
  <div className="space-y-3">
    {requests?.map((req) => (
      <div key={req.id} className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
        <div>
          <p className="font-medium text-gray-900">{req.itemName}</p>
          <p className="text-xs text-gray-500">Qty: {req.quantity} {req.unit}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-yellow-700">
          <Clock className="w-3 h-3" />
          Pending
        </div>
      </div>
    ))}
    {!requests?.length && <p className="text-sm text-gray-500 text-center py-4">No pending requests</p>}
  </div>
);

export default PendingRequestsList;
