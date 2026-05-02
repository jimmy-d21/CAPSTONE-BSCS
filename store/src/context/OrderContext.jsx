import { createContext, useContext, useState, useEffect } from 'react';
import { ordersData, AVAILABLE_ADDONS } from '../data/ordersData';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setOrders(ordersData.orders);
    setIsLoading(false);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(o =>
        o.id === orderId ? { ...o, status: newStatus, updatedAt: new Date().toISOString() } : o
      )
    );
  };

  // Add an addon to a specific item inside an order
  const addAddonToItem = (orderId, itemId, addon) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          items: o.items.map(it => {
            if (it.id !== itemId) return it;
            // prevent duplicates
            if (it.addons.find(a => a.id === addon.id)) return it;
            return { ...it, addons: [...it.addons, addon] };
          }),
        };
      })
    );
  };

  // Remove an addon from a specific item inside an order
  const removeAddonFromItem = (orderId, itemId, addonId) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;
        return {
          ...o,
          items: o.items.map(it => {
            if (it.id !== itemId) return it;
            return { ...it, addons: it.addons.filter(a => a.id !== addonId) };
          }),
        };
      })
    );
  };

  const getOrdersByStatus = (status) => {
    if (!status || status === 'all') return orders;
    return orders.filter(o => o.status === status);
  };

  const getPendingOrders    = () => orders.filter(o => o.status === 'pending');
  const getActiveOrders     = () => orders.filter(o => ['pending','on_grill','ready','dispatched'].includes(o.status));
  const getOrderCountByStatus = (status) => {
    if (!status || status === 'all') return orders.length;
    return orders.filter(o => o.status === status).length;
  };

  const value = {
    orders,
    isLoading,
    updateOrderStatus,
    addAddonToItem,
    removeAddonFromItem,
    getOrdersByStatus,
    getPendingOrders,
    getActiveOrders,
    getOrderCountByStatus,
    AVAILABLE_ADDONS,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within an OrderProvider');
  return context;
};