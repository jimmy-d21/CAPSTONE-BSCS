import { createContext, useContext, useState, useEffect } from 'react';
import { branchesData } from '../data/branchesData';

const BranchContext = createContext(null);

export const useBranch = () => {
  const context = useContext(BranchContext);
  if (!context) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
};

export const BranchProvider = ({ children }) => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branches, setBranches] = useState(branchesData);

  // Load selected branch from localStorage on mount
  useEffect(() => {
    const storedBranch = localStorage.getItem('ribshack_selected_branch');
    if (storedBranch) {
      setSelectedBranch(JSON.parse(storedBranch));
    }
  }, []);

  const selectBranch = (branch) => {
    setSelectedBranch(branch);
    localStorage.setItem('ribshack_selected_branch', JSON.stringify(branch));
  };

  const clearBranch = () => {
    setSelectedBranch(null);
    localStorage.removeItem('ribshack_selected_branch');
  };

  const getBranchesByCity = (city) => {
    return branches.filter(branch => branch.city === city);
  };

  const getNearbyBranches = (maxDistance = 10) => {
    return branches.filter(branch => branch.distance <= maxDistance);
  };

  const getOpenBranches = () => {
    return branches.filter(branch => branch.status === 'open');
  };

  const value = {
    selectedBranch,
    branches,
    selectBranch,
    clearBranch,
    getBranchesByCity,
    getNearbyBranches,
    getOpenBranches
  };

  return (
    <BranchContext.Provider value={value}>
      {children}
    </BranchContext.Provider>
  );
};
