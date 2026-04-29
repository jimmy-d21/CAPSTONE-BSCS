import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const OrderContext = createContext(null);

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrder must be used within an OrderProvider');
  return ctx;
};

const STORAGE_KEY = 'ribshack_orders';

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  /* Load persisted orders on mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setOrders(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const persist = (list) => {
    setOrders(list);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  /**
   * Place a new order.
   * @param {object} orderData – fields from CheckoutPage
   * @returns {object} the saved order (with generated id + timestamps)
   */
  const placeOrder = useCallback((orderData) => {
    const newOrder = {
      id: Math.floor(Math.random() * 900) + 400,
      status: 'order_received',
      orderDate: new Date().toISOString(),
      statusHistory: [
        { status: 'order_received', timestamp: new Date().toISOString() },
      ],
      ...orderData,
    };
    persist([newOrder, ...orders]);
    /* Also store as latest for OrderTrackingPage */
    localStorage.setItem('ribshack_latest_order', JSON.stringify(newOrder));
    return newOrder;
  }, [orders]);

  /**
   * Update the status of an existing order (e.g. from tracking page).
   */
  const updateOrderStatus = useCallback((orderId, newStatus) => {
    const updated = orders.map(o =>
      o.id === orderId
        ? {
            ...o,
            status: newStatus,
            statusHistory: [
              ...o.statusHistory,
              { status: newStatus, timestamp: new Date().toISOString() },
            ],
          }
        : o
    );
    persist(updated);
  }, [orders]);

  const getOrderById     = useCallback((id) => orders.find(o => o.id === Number(id)), [orders]);
  const getUserOrders    = useCallback((userId) => orders.filter(o => o.userId === userId), [orders]);
  const getActiveOrders  = useCallback(() =>
    orders.filter(o => !['delivered', 'cancelled'].includes(o.status)), [orders]);

  const value = {
    orders,
    placeOrder,
    updateOrderStatus,
    getOrderById,
    getUserOrders,
    getActiveOrders,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
