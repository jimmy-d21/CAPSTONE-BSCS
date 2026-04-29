import { useState } from "react";
import {
  Package, AlertTriangle, TrendingDown, CheckCircle,
  Send, Clock, Plus, Edit, X, Search, Trash2, Eye,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useInventory } from "../context/InventoryContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import PageHeader from "../components/common/PageHeader";
import CriticalAlertBanner from "../components/inventory/CriticalAlertBanner";
import DashboardCard from "../components/common/DashboardCard";

// ── helpers ─────────────────────────────────────────────────────────────────
const EMPTY_FORM = {
  itemName: "", itemType: "Ingredient",
  currentStock: 0, minimumThreshold: 0, maximumThreshold: 0, unit: "kg",
};

const STATUS_COLOR = {
  critical: "bg-red-100 text-red-800 border-red-200",
  low:      "bg-yellow-100 text-yellow-800 border-yellow-200",
  adequate: "bg-green-100 text-green-800 border-green-200",
};

const STATUS_ICON = {
  critical: <AlertTriangle className="size-4" />,
  low:      <TrendingDown className="size-4" />,
  adequate: <CheckCircle className="size-4" />,
};

const STATUS_LABEL = { critical: "Critical", low: "Low", adequate: "Adequate" };

// ── shared modal shell ───────────────────────────────────────────────────────
const Modal = ({ title, subtitle, onClose, children, footer }) => (
  <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-xl w-full max-w-md shadow-xl">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <X className="size-5" />
        </button>
      </div>
      <div className="p-6 space-y-4">{children}</div>
      {footer && <div className="p-6 border-t border-gray-200 flex gap-3">{footer}</div>}
    </div>
  </div>
);

// ── item form fields (shared by Add + Edit) ──────────────────────────────────
const ItemFormFields = ({ formData, onChange }) => (
  <>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
      <input name="itemName" value={formData.itemName} onChange={onChange} required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Item Type *</label>
      <select name="itemType" value={formData.itemType} onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
        <option value="Ingredient">Ingredient</option>
        <option value="Packaging">Packaging</option>
        <option value="Supply">Supply</option>
      </select>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock *</label>
        <input type="number" name="currentStock" value={formData.currentStock} onChange={onChange} min="0" required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
        <select name="unit" value={formData.unit} onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          {["kg","g","L","mL","pcs","boxes"].map(u => <option key={u} value={u}>{u}</option>)}
        </select>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Min Threshold *</label>
        <input type="number" name="minimumThreshold" value={formData.minimumThreshold} onChange={onChange} min="0" required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Max Threshold *</label>
        <input type="number" name="maximumThreshold" value={formData.maximumThreshold} onChange={onChange} min="0" required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>
  </>
);

// ── page ─────────────────────────────────────────────────────────────────────
const InventoryPage = () => {
  const {
    inventory, restockRequests, isLoading,
    getLowStockItems, getCriticalStockItems, getInventoryStats, getPendingRequests,
    createRestockRequest, addInventoryItem, updateInventoryItem, deleteInventoryItem,
  } = useInventory();

  const [showAdd,     setShowAdd]     = useState(false);
  const [showEdit,    setShowEdit]    = useState(false);
  const [showRestock, setShowRestock] = useState(false);
  const [showDelete,  setShowDelete]  = useState(false);
  const [showView,    setShowView]    = useState(false);

  const [editingItem,    setEditingItem]    = useState(null);
  const [restockingItem, setRestockingItem] = useState(null);
  const [deletingItem,   setDeletingItem]   = useState(null);
  const [viewingItem,    setViewingItem]    = useState(null);

  const [searchTerm,  setSearchTerm]  = useState("");
  const [filterType,  setFilterType]  = useState("all");
  const [formData,    setFormData]    = useState(EMPTY_FORM);
  const [restockForm, setRestockForm] = useState({ quantity: 0, urgency: "normal", notes: "" });

  if (isLoading) return <LoadingSpinner message="Loading inventory..." />;

  const criticalItems   = getCriticalStockItems();
  const stats           = getInventoryStats();
  const pendingRequests = getPendingRequests();

  const filteredInventory = inventory.filter((item) => {
    const matchSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.itemType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === "all" || item.itemType === filterType;
    return matchSearch && matchType;
  });

  // ── form helpers ────────────────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: ["currentStock","minimumThreshold","maximumThreshold"].includes(name) ? Number(value) : value,
    }));
  };

  const resetForm = () => setFormData(EMPTY_FORM);

  // ── handlers ────────────────────────────────────────────────────────────────
  const openRestock = (item) => {
    setRestockingItem(item);
    const suggested = item.maximumThreshold - item.currentStock;
    setRestockForm({
      quantity: suggested > 0 ? suggested : item.minimumThreshold,
      urgency: item.status === "critical" ? "critical" : item.status === "low" ? "high" : "normal",
      notes: "",
    });
    setShowRestock(true);
  };

  const submitRestock = (e) => {
    e.preventDefault();
    createRestockRequest(restockingItem.id || restockingItem.itemId, restockForm.quantity, restockForm.urgency);
    setShowRestock(false);
    setRestockingItem(null);
    setRestockForm({ quantity: 0, urgency: "normal", notes: "" });
  };

  const submitAdd = (e) => {
    e.preventDefault();
    addInventoryItem(formData);
    setShowAdd(false);
    resetForm();
  };

  const openEdit = (item) => {
    setEditingItem(item);
    setFormData({ itemName: item.itemName, itemType: item.itemType, currentStock: item.currentStock,
      minimumThreshold: item.minimumThreshold, maximumThreshold: item.maximumThreshold, unit: item.unit });
    setShowEdit(true);
  };

  const submitEdit = (e) => {
    e.preventDefault();
    updateInventoryItem(editingItem.itemId || editingItem.id, formData);
    setShowEdit(false);
    setEditingItem(null);
    resetForm();
  };

  const openView = (item) => { setViewingItem(item); setShowView(true); };

  const openDelete = (item) => { setDeletingItem(item); setShowDelete(true); };

  const confirmDelete = () => {
    deleteInventoryItem?.(deletingItem.itemId || deletingItem.id);
    setShowDelete(false);
    setDeletingItem(null);
  };

  // ── render ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6 max-w-[1400px] mx-auto space-y-6">

        {/* Header */}
        <PageHeader title="Inventory Management" subtitle="Track and manage your stock levels">
          <Button onClick={() => setShowAdd(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="size-4 mr-2" />Add New Item
          </Button>
        </PageHeader>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DashboardCard title="Adequate Stock"    value={stats.adequate}          subtitle="Items in good stock"    icon={CheckCircle}   color="green"  />
          <DashboardCard title="Low Stock"         value={stats.low}               subtitle="Need restock soon"      icon={TrendingDown}  color="orange" />
          <DashboardCard title="Critical Stock"    value={stats.critical}          subtitle="Immediate attention"    icon={AlertTriangle} color="orange" />
          <DashboardCard title="Pending Requests"  value={pendingRequests.length}  subtitle="Awaiting approval"      icon={Clock}         color="blue"   />
        </div>

        {/* Critical Alert Banner */}
        <CriticalAlertBanner items={criticalItems.map(i => ({ name: i.itemName }))} />

        {/* Search & Filter */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[200px] relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
                <input
                  type="text" placeholder="Search items..." value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white">
                <option value="all">All Types</option>
                <option value="Ingredient">Ingredients</option>
                <option value="Packaging">Packaging</option>
                <option value="Supply">Supplies</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Table */}
        <Card className="border border-gray-200 shadow-sm">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {["Item","Type","Current Stock","Min","Max","Status","Actions"].map((h, i) => (
                    <th key={h} className={`py-3 px-4 text-sm font-semibold text-gray-700 ${i === 6 || i === 5 ? "text-center" : i >= 2 && i <= 4 ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => (
                  <tr key={item.id || item.itemId} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">{item.itemName}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-gray-100 text-gray-700 border border-gray-200">{item.itemType}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold">{item.currentStock} {item.unit}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{item.minimumThreshold} {item.unit}</td>
                    <td className="py-3 px-4 text-right text-gray-600">{item.maximumThreshold} {item.unit}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={`${STATUS_COLOR[item.status] || STATUS_COLOR.adequate} border px-2 py-1 text-xs`}>
                        <div className="flex items-center gap-1">
                          {STATUS_ICON[item.status]}
                          {STATUS_LABEL[item.status] || item.status}
                        </div>
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2 justify-center">
                        <button onClick={() => openView(item)}    className="p-1.5 text-gray-600 hover:text-blue-600 transition-colors" title="View"><Eye className="size-4" /></button>
                        <button onClick={() => openEdit(item)}    className="p-1.5 text-gray-600 hover:text-blue-600 transition-colors" title="Edit"><Edit className="size-4" /></button>
                        {(item.status === "low" || item.status === "critical") && (
                          <button onClick={() => openRestock(item)} className="p-1.5 text-gray-600 hover:text-green-600 transition-colors" title="Restock"><Send className="size-4" /></button>
                        )}
                        <button onClick={() => openDelete(item)}  className="p-1.5 text-gray-600 hover:text-red-600 transition-colors" title="Delete"><Trash2 className="size-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* ── Restock Modal ──────────────────────────────────────────────────── */}
        {showRestock && restockingItem && (
          <Modal title="Request Restock" subtitle={restockingItem.itemName} onClose={() => setShowRestock(false)}
            footer={<>
              <Button type="submit" form="restock-form" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"><Send className="size-4 mr-2" />Submit Request</Button>
              <Button type="button" onClick={() => setShowRestock(false)} variant="outline" className="flex-1">Cancel</Button>
            </>}
          >
            <form id="restock-form" onSubmit={submitRestock}>
              <div className="bg-gray-50 rounded-lg p-3 text-sm mb-4">
                <div className="flex justify-between mb-1"><span className="text-gray-600">Current Stock:</span><span className="font-semibold">{restockingItem.currentStock} {restockingItem.unit}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Min Threshold:</span><span className="font-semibold">{restockingItem.minimumThreshold} {restockingItem.unit}</span></div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Needed</label>
                  <input type="number" name="quantity" value={restockForm.quantity} min="1" required
                    onChange={(e) => setRestockForm(p => ({ ...p, quantity: Number(e.target.value) }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                  <select name="urgency" value={restockForm.urgency}
                    onChange={(e) => setRestockForm(p => ({ ...p, urgency: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="critical">🔴 Critical</option>
                    <option value="high">🟠 High</option>
                    <option value="normal">🟢 Normal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
                  <textarea rows="2" value={restockForm.notes} placeholder="Add any additional information..."
                    onChange={(e) => setRestockForm(p => ({ ...p, notes: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                </div>
              </div>
            </form>
          </Modal>
        )}

        {/* ── Add Modal ─────────────────────────────────────────────────────── */}
        {showAdd && (
          <Modal title="Add New Item" onClose={() => { setShowAdd(false); resetForm(); }}
            footer={<>
              <Button type="submit" form="add-form" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"><Plus className="size-4 mr-2" />Add Item</Button>
              <Button type="button" onClick={() => { setShowAdd(false); resetForm(); }} variant="outline" className="flex-1">Cancel</Button>
            </>}
          >
            <form id="add-form" onSubmit={submitAdd}>
              <ItemFormFields formData={formData} onChange={handleInputChange} />
            </form>
          </Modal>
        )}

        {/* ── Edit Modal ────────────────────────────────────────────────────── */}
        {showEdit && (
          <Modal title="Edit Item" onClose={() => { setShowEdit(false); resetForm(); }}
            footer={<>
              <Button type="submit" form="edit-form" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"><Edit className="size-4 mr-2" />Update Item</Button>
              <Button type="button" onClick={() => { setShowEdit(false); resetForm(); }} variant="outline" className="flex-1">Cancel</Button>
            </>}
          >
            <form id="edit-form" onSubmit={submitEdit}>
              <ItemFormFields formData={formData} onChange={handleInputChange} />
            </form>
          </Modal>
        )}

        {/* ── View Modal ────────────────────────────────────────────────────── */}
        {showView && viewingItem && (
          <Modal title="Item Details" onClose={() => setShowView(false)}
            footer={<>
              <Button onClick={() => { setShowView(false); openEdit(viewingItem); }} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"><Edit className="size-4 mr-2" />Edit Item</Button>
              <Button onClick={() => setShowView(false)} variant="outline" className="flex-1">Close</Button>
            </>}
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                ["Item Name",      viewingItem.itemName],
                ["Type",           viewingItem.itemType],
                ["Current Stock",  `${viewingItem.currentStock} ${viewingItem.unit}`],
                ["Min Threshold",  `${viewingItem.minimumThreshold} ${viewingItem.unit}`],
                ["Max Threshold",  `${viewingItem.maximumThreshold} ${viewingItem.unit}`],
              ].map(([label, val]) => (
                <div key={label}>
                  <label className="text-xs font-medium text-gray-500 uppercase">{label}</label>
                  <p className="text-gray-900 font-medium mt-1">{val}</p>
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">Status</label>
                <div className="mt-1">
                  <Badge className={`${STATUS_COLOR[viewingItem.status]} border`}>{STATUS_LABEL[viewingItem.status]}</Badge>
                </div>
              </div>
            </div>
          </Modal>
        )}

        {/* ── Delete Confirmation ───────────────────────────────────────────── */}
        {showDelete && deletingItem && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-sm shadow-xl p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="size-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Confirm Delete</h3>
              <p className="text-gray-600 text-sm">Are you sure you want to delete <span className="font-semibold text-red-600">{deletingItem.itemName}</span>?</p>
              <div className="flex gap-3 mt-6">
                <Button onClick={confirmDelete} className="flex-1 bg-red-600 hover:bg-red-700 text-white">Delete</Button>
                <Button onClick={() => setShowDelete(false)} variant="outline" className="flex-1">Cancel</Button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default InventoryPage;
