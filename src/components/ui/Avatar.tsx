import { getImageUrl } from "../../utils/config";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-20 h-20 text-3xl",
};

export const Avatar = ({ src, name, size = "md" }: AvatarProps) => {
  const imageUrl = getImageUrl(src); // ✅ always resolves the URL correctly

  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name}
        className={`${sizes[size]} rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`${sizes[size]} rounded-full bg-[#6C63FF] flex items-center justify-center font-bold text-white`}
    >
      {name?.[0]?.toUpperCase() || "?"}
    </div>
  );
};