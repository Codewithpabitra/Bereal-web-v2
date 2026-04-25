import { useNavigate } from "react-router-dom";

interface CaptionProps {
  text: string;
  authorName: string;
}

export const Caption = ({ text, authorName }: CaptionProps) => {
  const navigate = useNavigate();

  // Split caption into words and render hashtags as clickable
  const parts = text.split(/(\s+)/);

  return (
    <p className="text-sm text-gray-200 mb-2">
      <span className="font-semibold">{authorName} </span>
      {parts.map((part, i) => {
        if (part.match(/^#[a-zA-Z0-9_]+$/)) {
          return (
            <button
              key={i}
              onClick={() =>
                navigate(`/hashtag/${part.slice(1).toLowerCase()}`)
              }
              className="text-primary hover:text-indigo-400 font-medium transition"
            >
              {part}
            </button>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
};