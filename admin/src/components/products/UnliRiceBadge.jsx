import { Badge } from "../ui/badge";
import { UtensilsCrossed } from "lucide-react";

export default function UnliRiceBadge({ enabled = false, className = "" }) {
  if (!enabled) return null;
  return (
    <Badge className={`bg-orange-100 text-orange-700 border-orange-200 ${className}`}>
      <UtensilsCrossed className="size-3 mr-1" />
      Unli-Rice
    </Badge>
  );
}
