const OrderItemsList = ({ items }) => (
  <ul className="space-y-1">
    {items?.map((item, i) => (
      <li key={i} className="flex justify-between text-sm">
        <span className="text-gray-700">{item.quantity}x {item.name}</span>
        {item.notes && <span className="text-xs text-gray-400 italic">{item.notes}</span>}
      </li>
    ))}
  </ul>
);

export default OrderItemsList;
