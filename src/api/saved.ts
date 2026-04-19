import api from "./axios";

export const getSavedAPI = () => api.get("/saved");
export const toggleSaveAPI = (postId: string) => api.put(`/saved/${postId}`);