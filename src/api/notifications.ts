import api from "./axios";

export const getNotificationsAPI = () => api.get("/notifications");
export const getUnreadCountAPI = () => api.get("/notifications/unread-count");
export const markAllReadAPI = () => api.put("/notifications/read-all");
export const markOneReadAPI = (id: string) => api.put(`/notifications/${id}/read`);