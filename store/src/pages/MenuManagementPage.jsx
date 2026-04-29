import { useState } from "react";
import { UtensilsCrossed, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { formatCurrency } from "../utils/formatters";
import { useMenu } from "../context/MenuContext";
import LoadingSpinner from "../components/common/LoadingSpinner";
import EmptyState from "../components/common/EmptyState";
import PageHeader from "../components/common/PageHeader";
import DashboardCard from "../components/common/DashboardCard";
import ProductCard from "../components/menu/ProductCard";
import CategoryFilter from "../components/menu/CategoryFilter";

const MenuManagementPage = () => {
  const {
    products, isLoading, toggleAvailability,
    getCategories, getProductsByCategory, getAvailableProducts, getUnavailableProducts,
  } = useMenu();

  const [selectedCategory, setSelectedCategory] = useState("all");

  if (isLoading) return <LoadingSpinner message="Loading menu..." />;

  const categories      = getCategories();
  const displayProducts = selectedCategory === "all" ? products : getProductsByCategory(selectedCategory);
  const availableCount  = getAvailableProducts().length;
  const unavailableCount = getUnavailableProducts().length;

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <PageHeader title="Menu Management" subtitle="Manage item availability and menu settings" />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard title="Total Items"  value={products.length}  subtitle="Menu items"           icon={UtensilsCrossed} color="blue"  />
        <DashboardCard title="Available"    value={availableCount}   subtitle="Currently in stock"   icon={Eye}             color="green" />
        <DashboardCard title="Unavailable"  value={unavailableCount} subtitle="Marked as sold out"   icon={EyeOff}          color="orange"/>
      </div>

      {/* Unavailable Alert */}
      {unavailableCount > 0 && (
        <Card className="border-2 border-yellow-300 bg-yellow-50">
          <CardContent className="p-4 flex items-center gap-3">
            <AlertCircle className="size-5 text-yellow-600" />
            <p className="text-sm text-yellow-900 font-medium">
              {unavailableCount} item{unavailableCount !== 1 ? "s are" : " is"} currently marked as unavailable
            </p>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <Card>
        <CardContent className="p-4">
          <CategoryFilter
            categories={categories}
            active={selectedCategory}
            onChange={setSelectedCategory}
          />
        </CardContent>
      </Card>

      {/* Products Grid */}
      {displayProducts.length === 0 ? (
        <Card>
          <CardContent className="p-12">
            <EmptyState icon={UtensilsCrossed} title="No items found" description="No menu items in this category" />
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.productId || product.id}
              product={product}
              onToggle={(id) => toggleAvailability(id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuManagementPage;
