import { createContext, useContext, useState, useEffect } from 'react';
import { ordersData } from '../data/ordersData';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from backend
    setOrders(ordersData.orders);
    setIsLoading(false);
  }, []);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() }
          : order
      )
    );
  };

  const getOrdersByStatus = (status) => {
    if (!status || status === 'all') {
      return orders;
    }
    return orders.filter(order => order.status === status);
  };

  const getPendingOrders = () => {
    return orders.filter(order => order.status === 'pending');
  };

  const getActiveOrders = () => {
    return orders.filter(order => 
      ['pending', 'on_grill', 'ready', 'dispatched'].includes(order.status)
    );
  };

  const getOrderCountByStatus = (status) => {
    if (!status || status === 'all') {
      return orders.length;
    }
    return orders.filter(order => order.status === status).length;
  };

  const value = {
    orders,
    isLoading,
    updateOrderStatus,
    getOrdersByStatus,
    getPendingOrders,
    getActiveOrders,
    getOrderCountByStatus
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};