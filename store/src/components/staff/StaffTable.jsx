import RoleBadge from "./RoleBadge";
import ShiftDisplay from "./ShiftDisplay";

const StaffTable = ({ staff }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-gray-200 text-left text-gray-500 font-medium">
          <th className="pb-3 pr-4">Name</th>
          <th className="pb-3 pr-4">Role</th>
          <th className="pb-3 pr-4">Shift</th>
          <th className="pb-3">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {staff?.map((member) => (
          <tr key={member.id} className="hover:bg-gray-50">
            <td className="py-3 pr-4 font-medium text-gray-900">{member.name}</td>
            <td className="py-3 pr-4"><RoleBadge role={member.role} /></td>
            <td className="py-3 pr-4"><ShiftDisplay shift={member.shift} /></td>
            <td className="py-3">
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${member.isOnDuty ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                {member.isOnDuty ? "On Duty" : "Off Duty"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default StaffTable;
