import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { Store, Plus, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useBranchContext } from "../context/BranchContext";
import BranchCard from "../components/branches/BranchCard";
import BranchForm from "../components/branches/BranchForm";
import StatsCard from "../components/common/StatsCard";

const EMPTY_FORM = {
  name: "",
  location: "",
  city: "",
  manager: "",
  phone: "",
  username: "",
  password: "",
  status: "open",
};

export default function BranchManagement() {
  const { branches, cities, addBranch, updateBranch, deleteBranch } =
    useBranchContext();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [branchToDelete, setBranchToDelete] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const resetForm = () => setFormData(EMPTY_FORM);

  const handleAddBranch = () => {
    addBranch({ ...formData, dailyRevenue: 0, orders: 0 });
    setIsAddDialogOpen(false);
    resetForm();
    toast.success(
      `Branch "${formData.name}" added successfully! Store account created.`,
    );
  };

  const handleEditBranch = () => {
    updateBranch(currentBranch.id, formData);
    setIsEditDialogOpen(false);
    resetForm();
    setCurrentBranch(null);
    toast.success("Branch updated successfully!");
  };

  const openEditDialog = (branch) => {
    setCurrentBranch(branch);
    setFormData({
      name: branch.name,
      location: branch.location,
      city: branch.city,
      manager: branch.manager,
      phone: branch.phone,
      username: branch.username,
      password: "",
      status: branch.status,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (branch) => {
    setBranchToDelete(branch);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteBranch(branchToDelete.id);
    toast.success(`Branch "${branchToDelete.name}" deleted successfully.`);
    setIsDeleteDialogOpen(false);
    setBranchToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Branch Management
          </h1>
          <p className="text-gray-500 mt-1">
            Manage all Ribshack locations and store accounts
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <Plus className="size-4 mr-2" />
              Add New Branch
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Branch</DialogTitle>
              <DialogDescription>
                Create a new Ribshack location and store account for the branch
                manager
              </DialogDescription>
            </DialogHeader>
            <BranchForm
              formData={formData}
              setFormData={setFormData}
              cities={cities}
              isEdit={false}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddBranch}
                className="bg-gradient-to-r from-orange-500 to-red-600"
                disabled={
                  !formData.name ||
                  !formData.location ||
                  !formData.username ||
                  !formData.password
                }
              >
                Create Branch & Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Branches"
          value={branches.length}
          icon={Store}
        />
        <StatsCard
          title="Active Today"
          value={branches.filter((b) => b.status === "open").length}
          valueColor="text-green-600"
        />
        <StatsCard
          title="Total Orders Today"
          value={branches.reduce((sum, b) => sum + b.orders, 0)}
        />
      </div>

      {/* Branches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {branches.map((branch) => (
          <BranchCard
            key={branch.id}
            branch={branch}
            onEdit={openEditDialog}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Branch</DialogTitle>
            <DialogDescription>
              Update branch information and store account details
            </DialogDescription>
          </DialogHeader>
          <BranchForm
            formData={formData}
            setFormData={setFormData}
            cities={cities}
            isEdit={true}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditBranch}
              className="bg-gradient-to-r from-orange-500 to-red-600"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <AlertTriangle className="size-6 text-red-600" />
              </div>
              <DialogTitle className="text-red-600">Delete Branch</DialogTitle>
            </div>
            <DialogDescription className="pt-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                {branchToDelete?.name}
              </span>
              ?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">Warning:</span> This action
                cannot be undone. Deleting this branch will also:
              </p>
              <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
                <li>Remove the store account permanently</li>
                <li>Delete all order history for this branch</li>
                <li>Remove all sales data and analytics</li>
                <li>Cannot be recovered once deleted</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
              {[
                ["Branch Name", branchToDelete?.name],
                ["Location", branchToDelete?.city],
                ["Manager", branchToDelete?.manager],
                ["Username", branchToDelete?.username],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-600">{label}:</span>
                  <span className="font-medium text-gray-900">{val}</span>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              <Trash2 className="size-4 mr-2" />
              Yes, Delete Branch
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
