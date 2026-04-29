import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used within an AuthProvider");
  return context;
};

// Keep backward-compat named export used directly in some pages
export const useAuth = () => useAuthContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("ribshack_admin_auth");
    const userData = localStorage.getItem("ribshack_admin_user");
    if (authToken) {
      setIsAuthenticated(true);
      setUser(userData ? JSON.parse(userData) : { username: "admin" });
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    if (username === "admin" && password === "ribshack2024") {
      const userData = { username, role: "admin" };
      localStorage.setItem("ribshack_admin_auth", "true");
      localStorage.setItem("ribshack_admin_user", JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
  };

  const logout = () => {
    localStorage.removeItem("ribshack_admin_auth");
    localStorage.removeItem("ribshack_admin_user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
