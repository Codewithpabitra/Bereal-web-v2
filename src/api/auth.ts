import api from "./axios";

export const registerAPI = (data: { name: string; email: string; password: string }) =>
  api.post("/auth/register", data);

export const loginAPI = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const changePasswordAPI = (data: {
  currentPassword: string;
  newPassword: string;
}) => api.put("/auth/change-password", data);

export const deleteAccountAPI = (password: string) =>
  api.delete("/auth/delete-account", { data: { password } });

export const getMeAPI = () => api.get("/auth/me");