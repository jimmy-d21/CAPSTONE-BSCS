import { useState } from "react";
import { Bell, X } from "lucide-react";
import { useNotifications } from "../../context/NotificationContext";
import { useNavigate } from "react-router";
import { getTimeAgo } from "../../utils/formatters";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, markAllAsRead } =
    useNotifications();
  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
    setIsOpen(false);
  };

  const getNotificationIcon = (type) => {
    const icons = {
      new_order: "🛒",
      admin_response: "✅",
      low_stock: "⚠️",
      system_alert: "📢",
    };
    return icons[type] || "📬";
  };

  return (
    <div className="relative">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Panel */}
          <div className="absolute right-0 top-12 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-[500px] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <p className="text-xs text-gray-500">{unreadCount} unread</p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-orange-600 hover:text-orange-700 font-medium"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto flex-1">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <button
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                        !notification.isRead ? "bg-orange-50" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <span className="text-2xl flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-sm text-gray-900 line-clamp-1">
                              {notification.title}
                            </p>
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-1" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {getTimeAgo(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
