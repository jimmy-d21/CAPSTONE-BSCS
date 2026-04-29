const TABS = ["all", "pending", "preparing", "ready"];

const StatusFilterTabs = ({ active, onChange }) => (
  <div className="flex gap-2">
    {TABS.map((tab) => (
      <button
        key={tab}
        onClick={() => onChange(tab)}
        className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${active === tab ? "bg-orange-600 text-white" : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"}`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default StatusFilterTabs;
