import { useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { NotificationItem } from "../components/notifications/NotificationItem";
import { useNotifications } from "../hooks/useNotifications";
import { Bell, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationSkeleton } from "../components/ui/NotificationSkeleton";

export default function Notifications() {
  const {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAllRead,
    markOneRead,
  } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-xl mx-auto pt-20 pb-24">

        {/* Header */}
        <div className="flex items-center justify-between px-4 mb-4">
          <div className="flex items-center gap-2">
            <Bell size={20} className="text-white" />
            <h2 className="text-xl font-bold text-white">Notifications</h2>
            {unreadCount > 0 && (
              <span
                className="text-xs text-white font-bold px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "#6C63FF" }}
              >
                {unreadCount}
              </span>
            )}
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
          )}
        </div>

        {/* List */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          {loading ? (
            <NotificationSkeleton />
          ) : notifications.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              <Bell size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-lg">No notifications yet</p>
              <p className="text-sm mt-1">
                When someone likes or comments, it'll show here
              </p>
            </div>
          ) : (
            <AnimatePresence>
              <div className="divide-y divide-gray-800">
                {notifications.map((n, i) => (
                  <motion.div
                    key={n._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <NotificationItem
                      notification={n}
                      onRead={markOneRead}
                    />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}