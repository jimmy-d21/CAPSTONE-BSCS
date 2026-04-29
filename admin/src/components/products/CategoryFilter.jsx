import { Button } from "../ui/button";

export default function CategoryFilter({ categories, selectedCategory, onSelect, getCategoryIcon }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <Button
        variant={selectedCategory === "All" ? "default" : "outline"}
        onClick={() => onSelect("All")}
        className={selectedCategory === "All" ? "bg-orange-600 hover:bg-orange-700" : ""}
      >
        All Products
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={selectedCategory === cat ? "default" : "outline"}
          onClick={() => onSelect(cat)}
          className={selectedCategory === cat ? "bg-orange-600 hover:bg-orange-700" : ""}
        >
          {getCategoryIcon?.(cat)} {cat}
        </Button>
      ))}
    </div>
  );
}
