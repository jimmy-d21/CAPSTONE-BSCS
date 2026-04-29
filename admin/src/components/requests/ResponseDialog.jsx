import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Store } from "lucide-react";

export default function ResponseDialog({ isOpen, onOpenChange, request, actionType, adminResponse, setAdminResponse, onSubmit }) {
  if (!request) return null;
  const isApprove = actionType === "approved";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isApprove ? "Approve Request" : "Decline Request"}</DialogTitle>
          <DialogDescription>
            {isApprove
              ? "Approving this request will update the branch inventory system."
              : "Please provide a reason for declining this request."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Store className="size-4 text-gray-600" />
              <span className="font-semibold text-gray-900">{request.branch}</span>
            </div>
            <div className="space-y-1">
              {request.items.map((item, idx) => (
                <div key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="text-gray-400">•</span>
                  <span>{item.quantity} {item.unit} of {item.item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              {isApprove ? "Delivery Notes (Optional)" : "Reason for Declining *"}
            </label>
            <Textarea
              placeholder={isApprove ? "e.g., Scheduled for delivery tomorrow at 10 AM" : "e.g., Supplier out of stock, will be available next week"}
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button
            onClick={onSubmit}
            className={isApprove ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            disabled={!isApprove && !adminResponse.trim()}
          >
            {isApprove ? "Approve Request" : "Decline Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
