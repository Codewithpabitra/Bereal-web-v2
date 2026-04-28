import { useState, useEffect, useCallback } from "react";
import { type Notification } from "../types";
import {
  getNotificationsAPI,
  getUnreadCountAPI,
  markAllReadAPI,
  markOneReadAPI,
} from "../api/notifications";
import { useSocket } from "../context/SocketContext";
import toast from "react-hot-toast";

export const useNotifications = () => {
  const { socket } = useSocket();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const { data } = await getUnreadCountAPI();
      setUnreadCount(data.count);
    } catch {}
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const { data } = await getNotificationsAPI();
      setNotifications(data);
    } catch {}
    finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchUnreadCount();
  }, []);

  // ✅ Real-time socket listener
  useEffect(() => {
    if (!socket) return;

    socket.on("notification:new", (notification: Notification) => {
      // Add to list
      setNotifications((prev) => [notification, ...prev]);

      // Increment unread count
      setUnreadCount((prev) => prev + 1);

      // Show toast popup
      const icons: Record<string, string> = {
        like: "❤️",
        comment: "💬",
        follow: "👤",
        repost: "🔁",
      };

      toast(notification.message, {
        icon: icons[notification.type] || "🔔",
        style: {
          background: "#1f2937",
          color: "#fff",
          borderRadius: "12px",
        },
      });
    });

    return () => {
      socket.off("notification:new");
    };
  }, [socket]);

  const markAllRead = async () => {
    await markAllReadAPI();
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markOneRead = async (id: string) => {
    await markOneReadAPI(id);
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    fetchUnreadCount,
    markAllRead,
    markOneRead,
  };
};