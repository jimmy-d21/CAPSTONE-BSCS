import { createContext, useContext, useState, useEffect } from "react";
import { notificationsData } from "../data/notificationsData";

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simulate loading data from backend
    setNotifications(notificationsData.notifications);
    setUnreadCount(notificationsData.unreadCount);
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification,
      ),
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    );
    setUnreadCount(0);
  };

  const addNotification = (type, title, message, actionUrl = null) => {
    const newNotification = {
      id: notifications.length + 1,
      type,
      title,
      message,
      isRead: false,
      actionUrl,
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotification, ...prev]);
    setUnreadCount((prev) => prev + 1);
  };

  const getUnreadNotifications = () => {
    return notifications.filter((n) => !n.isRead);
  };

  const value = {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification,
    getUnreadNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};
