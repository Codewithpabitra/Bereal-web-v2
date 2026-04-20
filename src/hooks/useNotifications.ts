import { useState, useEffect, useCallback } from "react";
import { type Notification } from "../types";
import {
  getNotificationsAPI,
  getUnreadCountAPI,
  markAllReadAPI,
  markOneReadAPI,
} from "../api/notifications";

export const useNotifications = () => {
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
    } catch {}  finally {
      setLoading(false);
    }
  }, []);

  // Poll every 30 seconds for new notifications
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const markAllRead = async () => {
    await markAllReadAPI();
    setUnreadCount(0);
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markOneRead = async (id: string) => {
    await markOneReadAPI(id);
    setNotifications(prev =>
      prev.map(n => (n._id === id ? { ...n, read: true } : n))
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
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