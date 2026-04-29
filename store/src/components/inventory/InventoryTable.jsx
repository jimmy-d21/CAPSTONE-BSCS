import StockProgressBar from "./StockProgressBar";

const InventoryTable = ({ items }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-200 text-left text-gray-500 font-medium">
          <th className="pb-3 pr-4">Item</th>
          <th className="pb-3 pr-4">Category</th>
          <th className="pb-3 pr-4">Stock</th>
          <th className="pb-3 pr-4">Level</th>
          <th className="pb-3">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {items?.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50">
            <td className="py-3 pr-4 font-medium text-gray-900">{item.name}</td>
            <td className="py-3 pr-4 text-gray-500">{item.category}</td>
            <td className="py-3 pr-4 text-gray-700">{item.currentStock} / {item.maxStock} {item.unit}</td>
            <td className="py-3 pr-4 w-32"><StockProgressBar current={item.currentStock} max={item.maxStock} /></td>
            <td className="py-3">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.currentStock <= item.criticalLevel ? "bg-red-100 text-red-700" : item.currentStock <= item.minStock ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                {item.currentStock <= item.criticalLevel ? "Critical" : item.currentStock <= item.minStock ? "Low" : "OK"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default InventoryTable;
