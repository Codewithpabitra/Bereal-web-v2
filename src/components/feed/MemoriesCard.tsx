import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMemoriesAPI } from "../../api/posts";
import { getImageUrl } from "../../utils/config";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { type Memory } from "../../types";

export const MemoriesCard = () => {
  const [memories, setMemories] = useState<Memory[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getMemoriesAPI();
        setMemories(data);
      } catch {}
    };
    fetch();
  }, []);

  if (memories.length === 0) return null;

  const firstMemory = memories[0];
  const firstPost = firstMemory.posts[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <Link to="/memories">
        <div className="relative rounded-2xl overflow-hidden border border-primary/30 group">
          {/* Background image */}
          <img
            src={getImageUrl(firstPost.image)}
            alt=""
            className="w-full h-40 object-cover group-hover:scale-105 transition duration-500 brightness-50"
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center justify-between px-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-primary" />
                <span className="text-primary text-xs font-bold uppercase tracking-wider">
                  Memory
                </span>
              </div>
              <p className="text-white font-black text-lg leading-tight">
                {firstMemory.yearsAgo} Year{firstMemory.yearsAgo > 1 ? "s" : ""} Ago Today
              </p>
              <p className="text-gray-300 text-sm mt-1">
                {firstMemory.posts.length} post{firstMemory.posts.length > 1 ? "s" : ""} from this day
              </p>
            </div>

            {/* Preview thumbnails */}
            <div className="flex -space-x-3">
              {firstMemory.posts.slice(0, 3).map((post, i) => (
                <img
                  key={post._id}
                  src={getImageUrl(post.image)}
                  alt=""
                  className="w-14 h-14 rounded-xl object-cover border-2 border-black"
                  style={{ zIndex: 3 - i }}
                />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};