import api from "./axios";

export const getCommentsAPI = (postId: string) => api.get(`/comments/${postId}`);
export const addCommentAPI = (postId: string, text: string) =>
  api.post(`/comments/${postId}`, { text });
export const deleteCommentAPI = (id: string) => api.delete(`/comments/${id}`);