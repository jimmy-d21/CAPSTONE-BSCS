const StockProgressBar = ({ current, max }) => {
  const pct = Math.min(100, Math.round((current / max) * 100));
  const color = pct <= 20 ? "bg-red-500" : pct <= 50 ? "bg-yellow-500" : "bg-green-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-500 w-8 text-right">{pct}%</span>
    </div>
  );
};

export default StockProgressBar;
