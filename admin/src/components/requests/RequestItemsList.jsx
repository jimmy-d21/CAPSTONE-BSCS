import { Package } from "lucide-react";

export default function RequestItemsList({ items }) {
  if (!items?.length) return null;
  return (
    <div>
      <h4 className="font-medium mb-2 flex items-center gap-2">
        <Package className="size-4" />
        Items Requested:
      </h4>
      <div className="bg-gray-50 rounded-lg p-3">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-600">
              <th className="pb-2 font-medium">Item</th>
              <th className="pb-2 text-right font-medium">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="border-t border-gray-200">
                <td className="py-2 text-sm text-gray-800">{item.item}</td>
                <td className="py-2 text-right font-medium text-sm">{item.quantity} {item.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
