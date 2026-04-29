import { createContext, useContext, useState, useEffect } from "react";
import { menuData } from "../data/menuData";

const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching menu data from backend
  const fetchMenuData = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setProducts(menuData.products);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  // Toggle product availability
  const toggleAvailability = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId || product.productId === productId
          ? {
              ...product,
              availability: {
                ...product.availability,
                isAvailable: !product.availability.isAvailable,
                unavailableReason: !product.availability.isAvailable
                  ? null
                  : "Temporarily unavailable",
              },
              isAvailable: !product.availability.isAvailable, // For backward compatibility
            }
          : product,
      ),
    );
  };

  // Toggle product active status
  const toggleActiveStatus = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, isActive: !product.isActive }
          : product,
      ),
    );
  };

  // Update product price
  const updateProductPrice = (productId, newPrice) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, basePrice: newPrice }
          : product,
      ),
    );
  };

  // Set product unavailable with reason
  const setProductUnavailable = (productId, reason) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              availability: {
                isAvailable: false,
                unavailableReason: reason,
              },
            }
          : product,
      ),
    );
  };

  // Get products by category
  const getProductsByCategory = (category) => {
    if (!category || category === "all") {
      return products;
    }
    return products.filter((product) => product.category === category);
  };

  // Get available products
  const getAvailableProducts = () => {
    return products.filter(
      (product) => product.isActive && product.availability.isAvailable,
    );
  };

  // Get unavailable products
  const getUnavailableProducts = () => {
    return products.filter((product) => !product.availability.isAvailable);
  };

  // Get all categories
  const getCategories = () => {
    const categories = [...new Set(products.map((p) => p.category))];
    return categories;
  };

  // Get category stats
  const getCategoryStats = () => {
    const categories = getCategories();
    return categories.map((category) => {
      const categoryProducts = getProductsByCategory(category);
      return {
        category,
        totalProducts: categoryProducts.length,
        availableProducts: categoryProducts.filter(
          (p) => p.availability.isAvailable,
        ).length,
        avgPrice:
          categoryProducts.reduce((sum, p) => sum + p.basePrice, 0) /
          categoryProducts.length,
      };
    });
  };

  const value = {
    products,
    isLoading,
    fetchMenuData,
    toggleAvailability,
    toggleActiveStatus,
    updateProductPrice,
    setProductUnavailable,
    getProductsByCategory,
    getAvailableProducts,
    getUnavailableProducts,
    getCategories,
    getCategoryStats,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
