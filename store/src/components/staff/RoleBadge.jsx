const ROLE_COLORS = {
  manager: "bg-purple-100 text-purple-700",
  cashier: "bg-blue-100 text-blue-700",
  cook: "bg-orange-100 text-orange-700",
  server: "bg-green-100 text-green-700",
  crew: "bg-gray-100 text-gray-700",
};

const RoleBadge = ({ role }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${ROLE_COLORS[role?.toLowerCase()] || ROLE_COLORS.crew}`}>
    {role}
  </span>
);

export default RoleBadge;
