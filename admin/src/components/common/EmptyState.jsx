import { PackageOpen } from "lucide-react";

export default function EmptyState({ icon: Icon = PackageOpen, title = "No items found", description = "Nothing to display here yet.", action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-gray-100 p-5 rounded-full mb-4">
        <Icon className="size-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-xs">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
