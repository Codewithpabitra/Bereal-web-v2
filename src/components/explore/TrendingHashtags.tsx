import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTrendingHashtagsAPI } from "../../api/posts";
import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export const TrendingHashtags = () => {
  const [trending, setTrending] = useState<{ tag: string; count: number }[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getTrendingHashtagsAPI();
        setTrending(data);
      } catch {}
    };
    fetch();
  }, []);

  if (trending.length === 0) return null;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp size={16} className="text-primary" />
        <p className="text-sm font-bold text-white">Trending Hashtags</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {trending.map(({ tag, count }, i) => (
          <motion.button
            key={tag}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => navigate(`/hashtag/${tag.slice(1)}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-800 hover:bg-primary/20 border border-gray-700 hover:border-primary/50 transition"
          >
            <span className="text-primary text-sm font-semibold">{tag}</span>
            <span className="text-gray-500 text-xs">{count}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};