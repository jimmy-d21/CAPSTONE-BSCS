import { useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../components/ui/dialog";
import { Package, Plus, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { useProductContext } from "../context/ProductContext";
import CategoryFilter from "../components/products/CategoryFilter";
import ProductCard from "../components/products/ProductCard";
import ProductForm from "../components/products/ProductForm";
import StatsCard from "../components/common/StatsCard";

const EMPTY_FORM = {
  name: "",
  category: "Pork",
  price: "",
  description: "",
  unliRice: false,
  available: true,
  image: null,
};

export default function ProductCatalog() {
  const { products, categories, addProduct, updateProduct, deleteProduct } =
    useProductContext();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);

  const categoryNames = categories.map((c) => c.name);
  const getCategoryIcon = (name) =>
    categories.find((c) => c.name === name)?.icon ?? "🍽️";

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setImagePreview(null);
    setEditImagePreview(null);
  };

  const handleAddProduct = () => {
    addProduct({
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description,
      unliRice: formData.unliRice,
      available: true,
      image: formData.image || null,
      popular: false,
    });
    setIsAddDialogOpen(false);
    resetForm();
    toast.success(`"${formData.name}" added to catalog!`);
  };

  const handleEditProduct = () => {
    updateProduct(currentProduct.id, {
      ...formData,
      price: parseFloat(formData.price),
      image: formData.image || currentProduct.image,
    });
    setIsEditDialogOpen(false);
    resetForm();
    setCurrentProduct(null);
    toast.success("Product updated successfully!");
  };

  const openEditDialog = (product) => {
    setCurrentProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      unliRice: product.unliRice,
      available: product.available ?? true,
      image: product.image || null,
    });
    setEditImagePreview(product.image || null);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    deleteProduct(productToDelete.id);
    toast.success(`"${productToDelete.name}" removed from catalog.`);
    setIsDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleToggleUnliRice = (id) => {
    const product = products.find((p) => p.id === id);
    updateProduct(id, { unliRice: !product.unliRice });
    toast.success(
      `Unli-Rice ${!product.unliRice ? "enabled" : "disabled"} for ${product.name}`,
    );
  };

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Global Product Catalog
          </h1>
          <p className="text-gray-500 mt-1">
            Manage menu items and pricing for all branches
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
              <Plus className="size-4 mr-2" />
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new item to the global product catalog
              </DialogDescription>
            </DialogHeader>
            <ProductForm
              formData={formData}
              setFormData={setFormData}
              categoryNames={categoryNames}
              getCategoryIcon={getCategoryIcon}
              imagePreview={imagePreview}
              setImagePreview={setImagePreview}
            />
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddProduct}
                className="bg-gradient-to-r from-orange-500 to-red-600"
                disabled={!formData.name || !formData.price}
              >
                Add Product
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Products"
          value={products.length}
          icon={Package}
        />
        <StatsCard
          title="With Unli-Rice"
          value={products.filter((p) => p.unliRice).length}
          valueColor="text-orange-600"
        />
        <StatsCard title="Categories" value={categories.length} />
        <StatsCard
          title="Avg. Price"
          value={`₱${products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length) : 0}`}
        />
      </div>

      <CategoryFilter
        categories={categoryNames}
        selectedCategory={selectedCategory}
        onSelect={setSelectedCategory}
        getCategoryIcon={getCategoryIcon}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            getCategoryIcon={getCategoryIcon}
            onEdit={openEditDialog}
            onDelete={handleDeleteClick}
            onToggleUnliRice={handleToggleUnliRice}
          />
        ))}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product information and pricing
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            formData={formData}
            setFormData={setFormData}
            categoryNames={categoryNames}
            getCategoryIcon={getCategoryIcon}
            imagePreview={editImagePreview}
            setImagePreview={setEditImagePreview}
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditProduct}
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
              <DialogTitle className="text-red-600">Delete Product</DialogTitle>
            </div>
            <DialogDescription className="pt-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                {productToDelete?.name}
              </span>{" "}
              from the catalog?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {productToDelete?.image && (
              <div className="flex justify-center">
                <img
                  src={productToDelete.image}
                  alt={productToDelete.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <span className="font-semibold">Warning:</span> This action
                cannot be undone.
              </p>
              <ul className="list-disc list-inside text-sm text-yellow-700 mt-2 space-y-1">
                <li>Remove from all branch menus</li>
                <li>Delete from all order histories</li>
                <li>Affect sales reports and analytics</li>
              </ul>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
              {[
                ["Product Name", productToDelete?.name],
                [
                  "Category",
                  `${getCategoryIcon(productToDelete?.category)} ${productToDelete?.category}`,
                ],
                ["Price", `₱${productToDelete?.price?.toLocaleString()}`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-gray-600">{label}:</span>
                  <span className="font-medium text-gray-900">{val}</span>
                </div>
              ))}
              <div className="flex justify-between">
                <span className="text-gray-600">Unli-Rice:</span>
                <Badge
                  variant={productToDelete?.unliRice ? "default" : "secondary"}
                  className={productToDelete?.unliRice ? "bg-green-500" : ""}
                >
                  {productToDelete?.unliRice ? "Enabled" : "Disabled"}
                </Badge>
              </div>
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
              Yes, Delete Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
