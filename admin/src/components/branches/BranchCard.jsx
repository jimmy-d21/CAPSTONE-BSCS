import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Store, MapPin, User, Phone, Key, Edit, Trash2, BarChart3 } from "lucide-react";
import BranchStatusBadge from "./BranchStatusBadge";

export default function BranchCard({ branch, onEdit, onDelete }) {
  const navigate = useNavigate();
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-lg">
              <Store className="size-6 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{branch.name}</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <MapPin className="size-3" />
                {branch.city}
              </CardDescription>
            </div>
          </div>
          <BranchStatusBadge status={branch.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <MapPin className="size-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600">{branch.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="size-4 text-gray-400" />
            <span className="text-gray-600">{branch.manager}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="size-4 text-gray-400" />
            <span className="text-gray-600">{branch.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Key className="size-4 text-gray-400" />
            <span className="text-gray-600 font-mono text-xs">{branch.username}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div>
            <div className="text-xs text-gray-500">Today's Revenue</div>
            <div className="text-lg font-bold text-green-600">₱{branch.dailyRevenue.toLocaleString()}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Orders Today</div>
            <div className="text-lg font-bold">{branch.orders}</div>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            onClick={() => navigate(`/admin/branches/${branch.id}`)}
          >
            <BarChart3 className="size-4 mr-2" />
            View Store Dashboard
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onEdit(branch)}>
              <Edit className="size-4 mr-2" />Edit
            </Button>
            <Button variant="outline" size="sm" className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => onDelete(branch)}>
              <Trash2 className="size-4 mr-2" />Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
