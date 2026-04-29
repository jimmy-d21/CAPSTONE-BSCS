import { Badge } from "../ui/badge";
import { Circle } from "lucide-react";

const STATUS_MAP = {
  open:    { label: "Open",    className: "bg-green-500 text-white" },
  closed:  { label: "Closed",  className: "bg-gray-400 text-white" },
  pending: { label: "Pending", className: "bg-orange-500 text-white" },
  active:  { label: "Active",  className: "bg-green-500 text-white" },
  inactive:{ label: "Inactive",className: "bg-gray-400 text-white" },
};

export default function StatusBadge({ status, showDot = true }) {
  const config = STATUS_MAP[status?.toLowerCase()] ?? { label: status, className: "bg-gray-400 text-white" };
  return (
    <Badge className={config.className}>
      {showDot && <Circle className="size-2 mr-1" fill="currentColor" />}
      {config.label}
    </Badge>
  );
}
