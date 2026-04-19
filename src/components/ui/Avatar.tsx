interface AvatarProps {
    src?: string;
    name: string;
    size?: "sm" | "md" | "lg";
  }
  
  const sizes = { sm: "w-8 h-8 text-sm", md: "w-10 h-10 text-base", lg: "w-20 h-20 text-3xl" };
  
  export const Avatar = ({ src, name, size = "md" }: AvatarProps) => {
    if (src) {
      return <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover`} />;
    }
    return (
      <div className={`${sizes[size]} rounded-full bg-primary flex items-center justify-center font-bold text-white`}>
        {name?.[0]?.toUpperCase() || "?"}
      </div>
    );
  };