const CategoryFilter = ({ categories, active, onChange }) => (
  <div className="flex flex-wrap gap-2">
    <button
      onClick={() => onChange("all")}
      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${active === "all" ? "bg-orange-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
    >
      All
    </button>
    {categories?.map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${active === cat ? "bg-orange-600 text-white" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"}`}
      >
        {cat}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
