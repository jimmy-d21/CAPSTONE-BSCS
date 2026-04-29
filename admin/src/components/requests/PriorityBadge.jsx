import { Badge } from "../ui/badge";

const PRIORITY_MAP = {
  high:   { label: "HIGH",   className: "bg-red-500 text-white" },
  medium: { label: "MEDIUM", className: "bg-yellow-500 text-white" },
  low:    { label: "LOW",    className: "bg-blue-500 text-white" },
};

export default function PriorityBadge({ priority }) {
  const config = PRIORITY_MAP[priority?.toLowerCase()] ?? { label: priority?.toUpperCase() ?? "—", className: "bg-gray-400 text-white" };
  return <Badge className={config.className}>{config.label}</Badge>;
}
