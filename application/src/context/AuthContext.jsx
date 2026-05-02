import { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/userData';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('ribshack_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate API call - in real app, this would call backend
    const foundUser = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      const userWithoutPassword = { ...foundUser };
      delete userWithoutPassword.password;
      
      setUser(userWithoutPassword);
      localStorage.setItem('ribshack_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const register = (userData) => {
    // Simulate API call - in real app, this would call backend
    const emailExists = mockUsers.some(u => u.email === userData.email);
    const mobileExists = mockUsers.some(u => u.mobile === userData.mobile);

    if (emailExists) {
      return { success: false, error: 'Email already registered' };
    }

    if (mobileExists) {
      return { success: false, error: 'Mobile number already registered' };
    }

    // Create new user
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      createdAt: new Date().toISOString()
    };

    // In real app, this would be saved to backend
    mockUsers.push(newUser);

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;

    setUser(userWithoutPassword);
    localStorage.setItem('ribshack_user', JSON.stringify(userWithoutPassword));
    
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ribshack_user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('ribshack_user', JSON.stringify(updatedUser));
    return { success: true, user: updatedUser };
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
