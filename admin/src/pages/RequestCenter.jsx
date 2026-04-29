import { useState } from "react";
import { Inbox, CheckCircle2, XCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { useRequestContext } from "../context/RequestContext";
import RequestCard from "../components/requests/RequestCard";
import ResponseDialog from "../components/requests/ResponseDialog";
import StatsCard from "../components/common/StatsCard";

export default function RequestCenter() {
  const { requests, updateRequestStatus } = useRequestContext();
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [adminResponse, setAdminResponse] = useState("");
  const [actionType, setActionType] = useState(null);

  const openDialog = (request, action) => {
    setSelectedRequest(request);
    setActionType(action);
    setAdminResponse("");
    setIsDialogOpen(true);
  };

  const handleRespond = () => {
    updateRequestStatus(selectedRequest.id, actionType, {
      respondedAt: new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      adminNotes: adminResponse,
    });
    setIsDialogOpen(false);
    if (actionType === "approved")
      toast.success(`Request from ${selectedRequest.branch} approved!`);
    else toast.error(`Request from ${selectedRequest.branch} declined.`);
  };

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const declinedCount = requests.filter((r) => r.status === "declined").length;

  const sorted = [...requests].sort((a, b) => {
    if (a.status === "pending" && b.status !== "pending") return -1;
    if (a.status !== "pending" && b.status === "pending") return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Request Center</h1>
        <p className="text-gray-500 mt-1">
          Branch inventory and restock requests
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Requests"
          value={requests.length}
          icon={Inbox}
        />
        <StatsCard
          title="Pending"
          value={pendingCount}
          icon={Clock}
          iconColor="text-orange-500"
          valueColor="text-orange-500"
        />
        <StatsCard
          title="Approved"
          value={approvedCount}
          icon={CheckCircle2}
          iconColor="text-green-500"
          valueColor="text-green-500"
        />
        <StatsCard
          title="Declined"
          value={declinedCount}
          icon={XCircle}
          iconColor="text-red-500"
          valueColor="text-red-500"
        />
      </div>

      <div className="space-y-4">
        {sorted.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onApprove={(r) => openDialog(r, "approved")}
            onDecline={(r) => openDialog(r, "declined")}
          />
        ))}
      </div>

      <ResponseDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        request={selectedRequest}
        actionType={actionType}
        adminResponse={adminResponse}
        setAdminResponse={setAdminResponse}
        onSubmit={handleRespond}
      />
    </div>
  );
}
