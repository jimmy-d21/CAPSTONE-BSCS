export const notificationsData = {
  notifications: [
    {
      id: 1,
      type: "new_order",
      title: "New Order Received",
      message: "Order #402 from Juan Dela Cruz - Delivery",
      isRead: false,
      actionUrl: "/kitchen",
      createdAt: "2026-03-28T10:50:00"
    },
    {
      id: 2,
      type: "admin_response",
      title: "Admin Approved Request",
      message: "BBQ Sauce restock request approved - Delivery scheduled for tomorrow",
      isRead: false,
      actionUrl: "/inventory",
      createdAt: "2026-03-28T10:30:00"
    },
    {
      id: 3,
      type: "low_stock",
      title: "Low Inventory Alert",
      message: "Rice stock is below minimum threshold (3 sacks remaining)",
      isRead: false,
      actionUrl: "/inventory",
      createdAt: "2026-03-28T10:15:00"
    },
    {
      id: 4,
      type: "low_stock",
      title: "Low Inventory Alert",
      message: "Blue Marlin stock is critically low (2.5 kg remaining)",
      isRead: false,
      actionUrl: "/inventory",
      createdAt: "2026-03-28T10:00:00"
    },
    {
      id: 5,
      type: "new_order",
      title: "New Order Received",
      message: "Order #407 from Linda Ramos - Dine-in",
      isRead: true,
      actionUrl: "/kitchen",
      createdAt: "2026-03-28T09:40:00"
    },
    {
      id: 6,
      type: "system_alert",
      title: "Staff Check-in",
      message: "Maria Santos checked in for morning shift",
      isRead: true,
      actionUrl: "/staff",
      createdAt: "2026-03-28T08:10:00"
    }
  ],
  unreadCount: 4
};
