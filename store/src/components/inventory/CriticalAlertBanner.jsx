import { AlertTriangle } from "lucide-react";

const CriticalAlertBanner = ({ items }) => {
  if (!items?.length) return null;
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
      <div>
        <p className="font-semibold text-red-800">Critical Stock Alert</p>
        <p className="text-sm text-red-600 mt-1">{items.length} item(s) critically low: {items.map(i => i.name).join(", ")}</p>
      </div>
    </div>
  );
};

export default CriticalAlertBanner;
