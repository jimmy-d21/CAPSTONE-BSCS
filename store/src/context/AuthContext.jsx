import { createContext, useContext, useState, useEffect } from "react";
import { storage } from "../utils/helpers";
import { storesData } from "../data/storesData";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [branch, setBranch] = useState(null);
  const [allStores, setAllStores] = useState([]);
  const [currentStore, setCurrentStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching stores from backend
  const fetchStores = () => {
    // Simulate API call delay
    setTimeout(() => {
      setAllStores(storesData.stores);
    }, 300);
  };

  useEffect(() => {
    // Fetch all stores
    fetchStores();

    // Check if user is already logged in
    const storedUser = storage.get("user");
    const storedBranch = storage.get("branch");
    const storedStore = storage.get("store");

    if (storedUser && storedBranch) {
      setUser(storedUser);
      setBranch(storedBranch);

      // Set current store from stored data or find by branch code
      if (storedStore) {
        setCurrentStore(storedStore);
      } else if (storedBranch.branchCode) {
        const store = storesData.stores.find(
          (s) => s.branchCode === storedBranch.branchCode,
        );
        if (store) {
          setCurrentStore(store);
          storage.set("store", store);
        }
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (username, password) => {
    // Simulate API call
    // In a real app, this would validate credentials against the backend

    // Demo credentials for SM Bacolod branch
    const validCredentials = {
      username: "sm_bacolod_user",
      password: "ribshack123",
    };

    if (
      username === validCredentials.username &&
      password === validCredentials.password
    ) {
      const userData = {
        id: 1,
        username: username,
        fullName: "Juan Manager",
        role: "manager",
        email: "juan.manager@ribshack.ph",
      };

      // Find store data from stores list
      const storeData = storesData.stores.find(
        (s) => s.branchCode === "sm_bacolod",
      );

      const branchData = {
        branchId: storeData.storeId,
        branchCode: storeData.branchCode,
        branchName: storeData.branchName,
        location: storeData.location.shortAddress,
        address: storeData.location.fullAddress,
        city: storeData.location.city,
      };

      setUser(userData);
      setBranch(branchData);
      setCurrentStore(storeData);

      storage.set("user", userData);
      storage.set("branch", branchData);
      storage.set("store", storeData);

      return { success: true };
    } else {
      return {
        success: false,
        error: "Invalid username or password",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setBranch(null);
    setCurrentStore(null);
    storage.remove("user");
    storage.remove("branch");
    storage.remove("store");
  };

  // Get store by ID
  const getStoreById = (storeId) => {
    return allStores.find((store) => store.storeId === storeId);
  };

  // Get store by branch code
  const getStoreByBranchCode = (branchCode) => {
    return allStores.find((store) => store.branchCode === branchCode);
  };

  // Get active stores only
  const getActiveStores = () => {
    return allStores.filter((store) => store.status === "active");
  };

  // Get stores by city
  const getStoresByCity = (city) => {
    return allStores.filter((store) => store.location.city === city);
  };

  // Get stores by region
  const getStoresByRegion = (region) => {
    return allStores.filter((store) => store.location.region === region);
  };

  // Check if store is currently open
  const isStoreOpen = (storeId) => {
    const store = getStoreById(storeId);
    if (!store || store.status !== "active") return false;

    const now = new Date();
    const dayOfWeek = now.toLocaleDateString("en-US", { weekday: "lowercase" });
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

    const todayHours = store.operatingHours[dayOfWeek];
    if (!todayHours || !todayHours.isOpen) return false;

    return currentTime >= todayHours.open && currentTime <= todayHours.close;
  };

  // Get store statistics
  const getStoreStats = () => {
    return {
      total: allStores.length,
      active: allStores.filter((s) => s.status === "active").length,
      temporarilyClosed: allStores.filter(
        (s) => s.status === "temporarily_closed",
      ).length,
      permanentlyClosed: allStores.filter(
        (s) => s.status === "permanently_closed",
      ).length,
      byType: {
        mall: allStores.filter((s) => s.storeType === "mall").length,
        standalone: allStores.filter((s) => s.storeType === "standalone")
          .length,
        foodCourt: allStores.filter((s) => s.storeType === "food_court").length,
      },
    };
  };

  const value = {
    user,
    branch,
    currentStore,
    allStores,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    fetchStores,
    getStoreById,
    getStoreByBranchCode,
    getActiveStores,
    getStoresByCity,
    getStoresByRegion,
    isStoreOpen,
    getStoreStats,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
