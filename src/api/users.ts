import api from "./axios";

export const getProfileAPI = (id: string) => api.get(`/users/${id}`);
export const updateProfileAPI = (formData: FormData) =>
  api.put("/users/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const followUserAPI = (id: string) => api.put(`/users/${id}/follow`);
export const getLikedPostsAPI = (id: string) => api.get(`/users/${id}/liked`);
export const getRepostedPostsAPI = (id: string) => api.get(`/users/${id}/reposts`);
export const searchUsersAPI = (query: string) =>
  api.get(`/users/search?q=${encodeURIComponent(query)}`);
export const getUserPostsAPI = (id: string) => api.get(`/users/${id}/posts`);
export const getSuggestedUsersAPI = () => api.get("/users/suggested");