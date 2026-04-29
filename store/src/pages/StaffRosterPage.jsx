import { Users, UserCheck, Clock, Calendar, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useStaff } from "../context/StaffContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/common/PageHeader";
import DashboardCard from "../components/common/DashboardCard";
import StaffCard from "../components/staff/StaffCard";
import StaffTable from "../components/staff/StaffTable";
import RoleBadge from "../components/staff/RoleBadge";
import ShiftDisplay from "../components/staff/ShiftDisplay";

// Adapt context data shape → component shape
const toCardShape = (member) => ({
  id:    member.id,
  name:  member.name,
  role:  member.role,
  shift: { start: member.shiftStartTime, end: member.shiftEndTime },
  isOnDuty: member.status === "on_duty",
});

const StaffRosterPage = () => {
  const {
    staff, isLoading,
    getOnDutyStaff, getScheduledStaff, getStaffStats,
  } = useStaff();

  if (isLoading) return <LoadingSpinner message="Loading staff roster..." />;

  const onDutyStaff    = getOnDutyStaff();
  const scheduledStaff = getScheduledStaff();
  const stats          = getStaffStats();

  const tableShape = staff.map((m) => ({
    id:       m.id,
    name:     m.name,
    role:     m.role,
    shift:    { start: m.shiftStartTime, end: m.shiftEndTime },
    isOnDuty: m.status === "on_duty",
  }));

  const STATUS_CLS   = { on_duty: "bg-green-600 text-white", scheduled: "bg-blue-600 text-white" };
  const STATUS_LABEL = { on_duty: "On Duty", scheduled: "Scheduled" };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-[1600px] mx-auto space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageHeader title="Staff Roster" subtitle="Current shift schedule and staff status overview" />
        <div className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200">
          <div className="text-xs text-gray-500">Today's Date</div>
          <div className="text-sm font-semibold text-gray-700">
            {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard title="On Duty"     value={onDutyStaff.length}    subtitle="Active right now"          icon={UserCheck} color="green"  />
        <DashboardCard title="Scheduled"   value={scheduledStaff.length} subtitle="Coming in for later shifts" icon={Clock}     color="blue"   />
        <DashboardCard title="Total Staff" value={stats.total}           subtitle="Complete team members"      icon={Users}     color="purple" />
        <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center justify-between">
              Roles <Briefcase className="size-5 text-orange-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 text-xs">
              <Badge className="bg-orange-100 text-orange-700">👨‍🍳 {stats.grillers} Grillers</Badge>
              <Badge className="bg-blue-100 text-blue-700">💰 {stats.cashiers} Cashiers</Badge>
              <Badge className="bg-green-100 text-green-700">🛵 {stats.riders} Riders</Badge>
              <Badge className="bg-purple-100 text-purple-700">👔 {stats.managers} Managers</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* On Duty */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="size-5 text-green-600" />
            Currently On Duty
            <Badge className="bg-green-100 text-green-700 ml-2">{onDutyStaff.length} Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {onDutyStaff.length === 0 ? (
            <EmptyState icon={UserCheck} title="No staff currently on duty" description="All team members are off duty" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {onDutyStaff.map((member) => (
                <div key={member.id}
                  className="p-5 bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                      <div className="mt-2"><RoleBadge role={member.role} /></div>
                    </div>
                    <Badge className="bg-green-600 text-white px-3 py-1">On Duty</Badge>
                  </div>
                  <div className="border-t border-green-100 pt-3">
                    <ShiftDisplay shift={{ start: member.shiftStartTime, end: member.shiftEndTime }} />
                    {member.phoneNumber && <div className="text-sm text-gray-600 mt-1">📞 {member.phoneNumber}</div>}
                    {member.email       && <div className="text-xs text-gray-500 mt-1 truncate">✉️ {member.email}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scheduled */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="size-5 text-blue-600" />
            Scheduled for Later
            <Badge className="bg-blue-100 text-blue-700 ml-2">{scheduledStaff.length} Upcoming</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {scheduledStaff.length === 0 ? (
            <EmptyState icon={Calendar} title="No scheduled staff" description="All shifts are currently filled or completed" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {scheduledStaff.map((member) => (
                <div key={member.id}
                  className="p-5 bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{member.name}</h3>
                      <div className="mt-2"><RoleBadge role={member.role} /></div>
                    </div>
                    <Badge className="bg-blue-600 text-white px-3 py-1">Scheduled</Badge>
                  </div>
                  <div className="border-t border-blue-100 pt-3">
                    <ShiftDisplay shift={{ start: member.shiftStartTime, end: member.shiftEndTime }} />
                    {member.phoneNumber && <div className="text-sm text-gray-600 mt-1">📞 {member.phoneNumber}</div>}
                    {member.email       && <div className="text-xs text-gray-500 mt-1 truncate">✉️ {member.email}</div>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* All Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5 text-gray-600" />
            All Staff Members
            <Badge className="bg-gray-100 text-gray-700 ml-2">{staff.length} Total</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                {["Staff Name","Role","Shift Schedule","Contact","Status"].map((h, i) => (
                  <th key={h} className={`py-3 px-4 font-semibold text-gray-700 text-sm ${i === 4 ? "text-center" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staff.map((member, idx) => (
                <tr key={member.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                  <td className="py-3 px-4 font-semibold text-gray-900">{member.name}</td>
                  <td className="py-3 px-4"><RoleBadge role={member.role} /></td>
                  <td className="py-3 px-4"><ShiftDisplay shift={{ start: member.shiftStartTime, end: member.shiftEndTime }} /></td>
                  <td className="py-3 px-4">
                    {member.phoneNumber && <div className="text-xs text-gray-600">📞 {member.phoneNumber}</div>}
                    {member.email       && <div className="text-xs text-gray-500 truncate max-w-[200px]">✉️ {member.email}</div>}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge className={`${STATUS_CLS[member.status] || "bg-gray-400 text-white"} px-3 py-1`}>
                      {STATUS_LABEL[member.status] || "Off Duty"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer summary */}
          <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center gap-3 text-sm">
            <div className="text-gray-600">Showing <span className="font-semibold">{staff.length}</span> staff members</div>
            <div className="flex gap-3">
              {[["green-600","On Duty",stats.onDuty],["blue-600","Scheduled",stats.scheduled],["gray-400","Off Duty",stats.offDuty || 0]].map(([color,label,count]) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded-full bg-${color}`} />
                  <span className="text-xs text-gray-600">{label}: {count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffRosterPage;
