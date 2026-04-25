import api from "./axios";

export const getReactionsAPI = (postId: string) =>
  api.get(`/reactions/${postId}`);

export const toggleReactionAPI = (postId: string, emoji: string) =>
  api.put(`/reactions/${postId}`, { emoji });