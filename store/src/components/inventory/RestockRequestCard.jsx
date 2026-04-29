import { Send } from "lucide-react";

const RestockRequestCard = ({ item, onRequest }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center justify-between">
    <div>
      <p className="font-semibold text-gray-900">{item.name}</p>
      <p className="text-sm text-gray-500">Current: {item.currentStock} {item.unit}</p>
    </div>
    <button onClick={() => onRequest(item)} className="flex items-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold hover:bg-orange-700 transition-colors">
      <Send className="w-4 h-4" />
      Request
    </button>
  </div>
);

export default RestockRequestCard;
