import api from "./axios";

export const getMyAnalyticsAPI = () => api.get("/analytics/me");