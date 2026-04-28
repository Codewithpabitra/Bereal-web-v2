export const BASE_URL = import.meta.env.VITE_BASE_URL || "";

export const getImageUrl = (path: string | undefined): string => {
  if (!path) return "";
  // Cloudinary URLs start with https — return as is
  if (path.startsWith("http")) return path;
  // Old local uploads — prepend base URL
  return `${BASE_URL}${path}`;
};