import { createContext, useContext, useState } from "react";
import { mockBranches, mockCities } from "../data/branchData";
import { mockStoreDashboards } from "../data/storeDashboardData";

const BranchContext = createContext(undefined);

export function BranchProvider({ children }) {
  const [branches, setBranches] = useState(mockBranches);

  const addBranch = (branch) =>
    setBranches((prev) => [...prev, { ...branch, id: Date.now() }]);

  const updateBranch = (id, updates) =>
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    );

  const deleteBranch = (id) =>
    setBranches((prev) => prev.filter((b) => b.id !== id));

  const getStoreDashboard = (branchId) => mockStoreDashboards[branchId] || null;

  return (
    <BranchContext.Provider
      value={{
        branches,
        cities: mockCities,
        addBranch,
        updateBranch,
        deleteBranch,
        getStoreDashboard,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
}

export function useBranchContext() {
  const ctx = useContext(BranchContext);
  if (!ctx)
    throw new Error("useBranchContext must be used within a BranchProvider");
  return ctx;
}
