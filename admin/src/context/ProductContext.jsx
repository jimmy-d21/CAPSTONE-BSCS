import { createContext, useContext, useState } from "react";
import { mockProducts } from "../data/productData";
import { mockCategories } from "../data/categoryData";

const ProductContext = createContext(undefined);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(mockProducts);

  const addProduct = (product) =>
    setProducts((prev) => [...prev, { ...product, id: Date.now() }]);

  const updateProduct = (id, updates) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );

  const deleteProduct = (id) =>
    setProducts((prev) => prev.filter((p) => p.id !== id));

  const toggleProductAvailability = (id) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, available: !p.available } : p))
    );

  return (
    <ProductContext.Provider
      value={{
        products,
        categories: mockCategories,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductAvailability,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProductContext must be used within a ProductProvider");
  return ctx;
}
