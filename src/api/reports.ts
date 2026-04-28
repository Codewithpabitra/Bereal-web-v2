import api from "./axios";

export const reportPostAPI = (postId: string, reason: string, details?: string) =>
  api.post(`/reports/post/${postId}`, { reason, details });

export const reportUserAPI = (userId: string, reason: string, details?: string) =>
  api.post(`/reports/user/${userId}`, { reason, details });

export const toggleBlockAPI = (userId: string) =>
  api.put(`/reports/block/${userId}`);

export const getBlockedUsersAPI = () => api.get("/reports/blocked");