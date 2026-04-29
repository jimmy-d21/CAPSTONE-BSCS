import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function BranchForm({ formData, setFormData, cities, isEdit = false }) {
  const update = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="grid grid-cols-2 gap-4 py-4">
      <div className="col-span-2 space-y-2">
        <Label>Branch Name *</Label>
        <Input placeholder="e.g., SM Bacolod" value={formData.name} onChange={(e) => update("name", e.target.value)} />
      </div>
      <div className="col-span-2 space-y-2">
        <Label>Full Address *</Label>
        <Input placeholder="Complete address with landmarks" value={formData.location} onChange={(e) => update("location", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>City *</Label>
        <Select value={formData.city} onValueChange={(v) => update("city", v)}>
          <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
          <SelectContent>
            {cities.map((city) => <SelectItem key={city} value={city}>{city}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Status *</Label>
        <Select value={formData.status} onValueChange={(v) => update("status", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 border-t pt-4 mt-2">
        <h4 className="font-medium mb-3">Branch Manager Details</h4>
      </div>
      <div className="space-y-2">
        <Label>Manager Name *</Label>
        <Input placeholder="Full name" value={formData.manager} onChange={(e) => update("manager", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Phone Number *</Label>
        <Input placeholder="+63 9XX XXX XXXX" value={formData.phone} onChange={(e) => update("phone", e.target.value)} />
      </div>
      <div className="col-span-2 border-t pt-4 mt-2">
        <h4 className="font-medium mb-3">Store Account Credentials</h4>
      </div>
      <div className="space-y-2">
        <Label>Username *</Label>
        <Input placeholder="e.g., sm_bacolod_user" value={formData.username} onChange={(e) => update("username", e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>{isEdit ? "New Password (leave blank to keep current)" : "Initial Password *"}</Label>
        <Input type="password" placeholder={isEdit ? "Enter new password to change" : "Secure password"} value={formData.password} onChange={(e) => update("password", e.target.value)} />
      </div>
    </div>
  );
}
