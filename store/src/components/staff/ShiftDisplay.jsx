import { Clock } from "lucide-react";

const ShiftDisplay = ({ shift }) => (
  <div className="flex items-center gap-1 text-sm text-gray-600">
    <Clock className="w-4 h-4" />
    <span>{shift?.start || "—"} – {shift?.end || "—"}</span>
  </div>
);

export default ShiftDisplay;
