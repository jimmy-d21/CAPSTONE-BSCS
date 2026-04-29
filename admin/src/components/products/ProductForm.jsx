import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Upload, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export default function ProductForm({ formData, setFormData, categoryNames, getCategoryIcon, imagePreview, setImagePreview }) {
  const fileInputRef = useRef(null);

  const update = (key, value) => setFormData((prev) => ({ ...prev, [key]: value }));

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Image size must be less than 5MB"); return; }
    if (!file.type.startsWith("image/")) { toast.error("Please select a valid image file"); return; }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      update("image", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    update("image", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4 py-4">
      <div className="space-y-2">
        <Label>Product Image</Label>
        <div className="flex items-center gap-4">
          {imagePreview ? (
            <div className="relative">
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg border" />
              <button onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition">
                <X className="size-4" />
              </button>
            </div>
          ) : (
            <div onClick={() => fileInputRef.current?.click()} className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-orange-500 transition bg-gray-50">
              <Upload className="size-8 text-gray-400" />
              <span className="text-xs text-gray-500 mt-1">Upload</span>
            </div>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          <div className="flex-1">
            <p className="text-sm text-gray-500">Upload a product image (max 5MB)</p>
            <p className="text-xs text-gray-400">Recommended: Square image, 400x400px</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Product Name *</Label>
        <Input placeholder="e.g., Pork Spare Ribs" value={formData.name} onChange={(e) => update("name", e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Category *</Label>
        <select
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          value={formData.category}
          onChange={(e) => update("category", e.target.value)}
        >
          {categoryNames.map((cat) => (
            <option key={cat} value={cat}>{getCategoryIcon?.(cat)} {cat}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Price (₱) *</Label>
        <Input type="number" placeholder="199" value={formData.price} onChange={(e) => update("price", e.target.value)} />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Input placeholder="Brief description of the dish" value={formData.description} onChange={(e) => update("description", e.target.value)} />
      </div>

      <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
        <div>
          <Label className="font-medium">Includes Unli-Rice</Label>
          <p className="text-sm text-gray-500">Enable unlimited rice for this item</p>
        </div>
        <Switch checked={formData.unliRice} onCheckedChange={(checked) => update("unliRice", checked)} />
      </div>
    </div>
  );
}
