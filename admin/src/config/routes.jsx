import { createBrowserRouter, Navigate } from "react-router";
import Login from "../pages/Login";
import DashboardLayout from "../components/layout/DashboardLayout";
import Analytics from "../pages/Analytics";
import BranchManagement from "../pages/BranchManagement";
import RequestCenter from "../pages/RequestCenter";
import ProductCatalog from "../pages/ProductCatalog";
import FinanceReports from "../pages/FinanceReports";
import StoreDashboard from "../pages/StoreDashboard";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/analytics" replace />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "branches",
        element: <BranchManagement />,
      },
      {
        path: "branches/:branchId",
        element: <StoreDashboard />,
      },
      {
        path: "requests",
        element: <RequestCenter />,
      },
      {
        path: "products",
        element: <ProductCatalog />,
      },
      {
        path: "finance",
        element: <FinanceReports />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
