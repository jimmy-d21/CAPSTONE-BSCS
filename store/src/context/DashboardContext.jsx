import { createContext, useContext, useState, useEffect } from "react";
import { dashboardData } from "../data/dashboardData";

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
  const [todayStats, setTodayStats] = useState(null);
  const [bestsellerOfTheDay, setBestsellerOfTheDay] = useState(null);
  const [hourlyRevenue, setHourlyRevenue] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [branchInfo, setBranchInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching dashboard data from backend
  const fetchDashboardData = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setTodayStats(dashboardData.todayStats);
      setBestsellerOfTheDay(dashboardData.bestsellerOfTheDay);
      setHourlyRevenue(dashboardData.hourlyRevenue);
      setCategorySales(dashboardData.categorySales);
      setRecentActivity(dashboardData.recentActivity);
      setBranchInfo(dashboardData.branchInfo);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Refresh dashboard data
  const refreshDashboard = () => {
    fetchDashboardData();
  };

  // Get total revenue
  const getTotalRevenue = () => {
    return todayStats?.grossRevenue || 0;
  };

  // Get total orders
  const getTotalOrders = () => {
    return todayStats?.totalOrders || 0;
  };

  // Get category with highest sales
  const getTopCategory = () => {
    if (!categorySales || categorySales.length === 0) return null;
    return categorySales.reduce((prev, current) =>
      prev.revenue > current.revenue ? prev : current,
    );
  };

  const value = {
    todayStats,
    bestsellerOfTheDay,
    hourlyRevenue,
    categorySales,
    recentActivity,
    branchInfo,
    isLoading,
    fetchDashboardData,
    refreshDashboard,
    getTotalRevenue,
    getTotalOrders,
    getTopCategory,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};
