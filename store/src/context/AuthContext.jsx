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
    // Aligned with admin/branchData.js — username = branchCode, password = "ribshack2024"
    const branchCredentials = [
      { username: "sm_bacolod",     branchCode: "sm_bacolod",     fullName: "Jose Reyes",        email: "jose.reyes@ribshack.ph" },
      { username: "ayala_cebu",     branchCode: "ayala_cebu",     fullName: "Maria Cruz",        email: "maria.cruz@ribshack.ph" },
      { username: "rob_iloilo",     branchCode: "rob_iloilo",     fullName: "Carlos Santos",     email: "carlos.santos@ribshack.ph" },
      { username: "sm_cdo",         branchCode: "sm_cdo",         fullName: "Ana Dela Cruz",     email: "ana.delacruz@ribshack.ph" },
      { username: "abreeza_davao",  branchCode: "abreeza_davao",  fullName: "Roberto Lim",       email: "roberto.lim@ribshack.ph" },
      { username: "gaisano_zambo",  branchCode: "gaisano_zambo",  fullName: "Elena Villanueva",  email: "elena.villanueva@ribshack.ph" },
      { username: "sm_manila",      branchCode: "sm_manila",      fullName: "Miguel Torres",     email: "miguel.torres@ribshack.ph" },
      { username: "gateway_cubao",  branchCode: "gateway_cubao",  fullName: "Sandra Aquino",     email: "sandra.aquino@ribshack.ph" },
    ];

    const match = branchCredentials.find(
      (c) => c.username === username && password === "ribshack2024"
    );

    if (match) {
      const userData = {
        id: match.branchCode,
        username: match.username,
        fullName: match.fullName,
        role: "manager",
        email: match.email,
      };

      const storeData = storesData.stores.find(
        (s) => s.branchCode === match.branchCode
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
