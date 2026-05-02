import { createBrowserRouter, RouterProvider, Navigate } from 'react-router';
import { Toaster } from 'sonner';
import { AuthProvider }   from './context/AuthContext';
import { BranchProvider } from './context/BranchContext';
import { CartProvider }   from './context/CartContext';
import { MenuProvider }   from './context/MenuContext';
import { OrderProvider }  from './context/OrderContext';
import { LoginPage }          from './pages/LoginPage';
import { BranchSelectorPage } from './pages/BranchSelectorPage';
import { HomePage }           from './pages/HomePage';
import { MenuPage }           from './pages/MenuPage';
import { ProductDetailPage }  from './pages/ProductDetailPage';
import { CartPage }           from './pages/CartPage';
import { CheckoutPage }       from './pages/CheckoutPage';
import { OrderTrackingPage }  from './pages/OrderTrackingPage';
import { OrdersPage }         from './pages/OrdersPage';
import { ProfilePage }        from './pages/ProfilePage';

const router = createBrowserRouter([
  { path: '/',                        element: <Navigate to="/login" replace /> },
  { path: '/login',                   element: <LoginPage /> },
  { path: '/branches',                element: <BranchSelectorPage /> },
  { path: '/home',                    element: <HomePage /> },
  { path: '/menu',                    element: <MenuPage /> },
  { path: '/product/:id',             element: <ProductDetailPage /> },
  { path: '/cart',                    element: <CartPage /> },
  { path: '/checkout',                element: <CheckoutPage /> },
  { path: '/order-tracking/:orderId', element: <OrderTrackingPage /> },
  { path: '/orders',                  element: <OrdersPage /> },
  { path: '/profile',                 element: <ProfilePage /> },
  { path: '*',                        element: <Navigate to="/login" replace /> },
]);

export default function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <BranchProvider>
          <CartProvider>
            <OrderProvider>
              <RouterProvider router={router} />
              <Toaster
                position="top-center"
                toastOptions={{
                  style: {
                    fontFamily: 'var(--font-sans)',
                    borderRadius: '12px',
                    fontSize: '14px',
                  },
                }}
              />
            </OrderProvider>
          </CartProvider>
        </BranchProvider>
      </MenuProvider>
    </AuthProvider>
  );
}
