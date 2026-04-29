import RoleBadge from "./RoleBadge";
import ShiftDisplay from "./ShiftDisplay";

const StaffCard = ({ staff }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-lg flex-shrink-0">
      {staff.name?.charAt(0)}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-gray-900 truncate">{staff.name}</p>
      <div className="flex items-center gap-2 mt-1">
        <RoleBadge role={staff.role} />
      </div>
    </div>
    <ShiftDisplay shift={staff.shift} />
  </div>
);

export default StaffCard;
