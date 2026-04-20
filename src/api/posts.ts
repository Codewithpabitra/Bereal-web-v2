import api from "./axios";

export const getFeedAPI = () => api.get("/posts/feed");

export const createPostAPI = (formData: FormData) =>
  api.post("/posts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const deletePostAPI = (id: string) => api.delete(`/posts/${id}`);
export const likePostAPI = (id: string) => api.put(`/posts/${id}/like`);
export const repostPostAPI = (id: string) => api.put(`/posts/${id}/repost`);
export const sharePostAPI = (id: string) => api.put(`/posts/${id}/share`);
export const getExploreAPI = () => api.get("/posts/explore");