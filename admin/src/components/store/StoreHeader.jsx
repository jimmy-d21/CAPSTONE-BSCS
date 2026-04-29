import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ArrowLeft, AlertTriangle } from "lucide-react";

export default function StoreHeader({ storeData, branchInfo }) {
  const navigate = useNavigate();
  const isClosed = branchInfo.status === "closed";

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/branches")}
            className="rounded-xl"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold text-gray-900">
                {storeData.branchName}
              </h1>
              <Badge className={isClosed ? "bg-red-500" : "bg-green-500"}>
                {isClosed ? "Closed" : "Open"}
              </Badge>
            </div>
            <p className="text-gray-500 mt-1">{branchInfo.location}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Manager</div>
          <div className="font-semibold text-gray-900">{branchInfo.manager}</div>
          <div className="text-sm text-gray-500">{branchInfo.phone}</div>
        </div>
      </div>

      {isClosed && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle className="size-6 text-red-600" />
          <div>
            <div className="font-semibold text-red-900">Store Currently Closed</div>
            <div className="text-sm text-red-700">
              This branch is not operating today. Showing last available data.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
