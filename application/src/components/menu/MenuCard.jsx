import { Plus, Star, Flame } from "lucide-react";
import { useNavigate } from "react-router";
import { formatPrice } from "../../utils/formatters";
import { getItemImage, FALLBACK_IMG } from "./FoodImages";
import { Badge } from "../ui/Badge";

/**
 * MenuCard — product grid card used in MenuPage and HomePage
 */
export function MenuCard({ item, onAdd }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${item.id}`)}
      style={{
        background: "var(--bg-card)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        border: "1.5px solid var(--border)",
        boxShadow: "var(--shadow-sm)",
        cursor: "pointer",
        opacity: item.available ? 1 : 0.55,
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          height: "128px",
          overflow: "hidden",
          background: "var(--bg-muted)",
        }}
      >
        <img
          src={getItemImage(item.image)}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = FALLBACK_IMG;
          }}
        />
        {/* Badges top-left */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {item.bestseller && (
            <Badge
              color="gold"
              style={{ fontSize: "10px", padding: "2px 7px" }}
            >
              <Star size={9} fill="currentColor" /> Best
            </Badge>
          )}
        </div>
        {/* Spicy top-right */}
        {item.spicyLevel > 0 && (
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "var(--accent)",
              borderRadius: "6px",
              padding: "3px 6px",
              display: "flex",
              gap: "1px",
            }}
          >
            {Array.from({ length: item.spicyLevel }).map((_, i) => (
              <Flame key={i} size={10} color="#fff" />
            ))}
          </div>
        )}
        {!item.available && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.55)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Badge color="red" style={{ fontSize: "11px" }}>
              Sold Out
            </Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "10px 12px 12px" }}>
        <p
          style={{
            fontSize: "13px",
            fontWeight: 600,
            lineHeight: 1.3,
            marginBottom: "8px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "33px",
            color: "var(--text-1)",
          }}
        >
          {item.name}
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontSize: "15px",
              fontWeight: 800,
              color: "var(--text-1)",
            }}
          >
            {formatPrice(item.price)}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd(item);
            }}
            disabled={!item.available}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              border: "none",
              background: item.available ? "var(--accent)" : "var(--text-4)",
              cursor: item.available ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              flexShrink: 0,
            }}
          >
            <Plus size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
