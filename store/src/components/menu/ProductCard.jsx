import AvailabilityToggle from "./AvailabilityToggle";
import UnliRiceBadge from "./UnliRiceBadge";

const ProductCard = ({ product, onToggle }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
    {product.imageUrl && (
      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.productName || product.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        {!product.availability?.isAvailable && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">Sold Out</span>
          </div>
        )}
      </div>
    )}
    <div className="p-4">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-gray-900">{product.productName || product.name}</h3>
        <AvailabilityToggle available={product.availability?.isAvailable ?? product.isAvailable} onChange={() => onToggle(product.id)} />
      </div>
      <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.description}</p>
      <div className="flex items-center justify-between">
        <span className="font-bold text-orange-600">₱{(product.basePrice || product.price)?.toLocaleString()}</span>
        {(product.includesUnliRice || product.hasUnliRice) && <UnliRiceBadge />}
      </div>
    </div>
  </div>
);

export default ProductCard;
