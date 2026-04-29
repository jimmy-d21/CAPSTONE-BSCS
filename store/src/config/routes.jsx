import { createBrowserRouter, Navigate } from 'react-router';
import Layout from '../components/layout/Layout';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import KitchenDisplayPage from '../pages/KitchenDisplayPage';
import InventoryPage from '../pages/InventoryPage';
import MenuManagementPage from '../pages/MenuManagementPage';
import StaffRosterPage from '../pages/StaffRosterPage';
import { storage } from '../utils/helpers';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const user = storage.get('user');
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const user = storage.get('user');
  
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    )
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />
      },
      {
        path: 'kitchen',
        element: <KitchenDisplayPage />
      },
      {
        path: 'inventory',
        element: <InventoryPage />
      },
      {
        path: 'menu',
        element: <MenuManagementPage />
      },
      {
        path: 'staff',
        element: <StaffRosterPage />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);
