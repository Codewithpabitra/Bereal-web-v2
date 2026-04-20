export const BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const getImageUrl = (path: string | undefined): string => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
};