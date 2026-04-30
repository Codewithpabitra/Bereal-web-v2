import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Skeleton } from "../components/ui/Skeleton";
import { getMemoriesAPI } from "../api/posts";
import { getImageUrl } from "../utils/config";
import { type Memory, type Post } from "../types";
import { Heart, Repeat2, ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const getYearsAgoLabel = (years: number) => {
  if (years === 1) return "1 Year Ago";
  return `${years} Years Ago`;
};

const getMonthDay = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
};

export default function Memories() {
  const navigate = useNavigate();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Post | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getMemoriesAPI();
        setMemories(data);
      } catch {
        toast.error("Failed to load memories");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 pt-20 pb-24">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Sparkles size={20} className="text-primary" />
              Memories
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              Your candid moments from the past
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-8">
            {[1, 2].map((i) => (
              <div key={i}>
                <Skeleton className="h-5 w-32 mb-4" />
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2].map((j) => (
                    <Skeleton key={j} className="aspect-square rounded-2xl" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : memories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "#6C63FF22" }}
            >
              <Sparkles size={36} className="text-primary" />
            </div>
            <p className="text-white font-bold text-lg">No memories yet</p>
            <p className="text-gray-500 text-sm mt-2 max-w-xs mx-auto">
              Keep posting! Your memories will appear here on this day next year.
            </p>
          </motion.div>
        ) : (
          <div className="space-y-10">
            {memories.map((memory, memIndex) => (
              <motion.div
                key={memory.yearsAgo}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: memIndex * 0.1 }}
              >
                {/* Year label */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="px-4 py-1.5 rounded-full text-sm font-black text-white"
                    style={{ backgroundColor: "#6C63FF" }}
                  >
                    {getYearsAgoLabel(memory.yearsAgo)}
                  </div>
                  <div className="flex-1 h-px bg-gray-800" />
                  <span className="text-gray-600 text-xs">
                    {getMonthDay(memory.date)}
                  </span>
                </div>

                {/* Posts grid */}
                <div className={`grid gap-2 ${
                  memory.posts.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-2"
                }`}>
                  {memory.posts.map((post, postIndex) => (
                    <motion.button
                      key={post._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: memIndex * 0.1 + postIndex * 0.05 }}
                      onClick={() => setSelected(post)}
                      className="relative rounded-2xl overflow-hidden group"
                    >
                      <img
                        src={getImageUrl(post.image)}
                        alt=""
                        className={`w-full object-cover group-hover:scale-105 transition duration-500 ${
                          memory.posts.length === 1
                            ? "aspect-video"
                            : "aspect-square"
                        }`}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                      {/* Stats overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition duration-300">
                        <div className="flex items-center gap-3 text-white text-xs font-semibold">
                          <span className="flex items-center gap-1">
                            <Heart size={12} fill="white" />
                            {post.likes.length}
                          </span>
                          <span className="flex items-center gap-1">
                            <Repeat2 size={12} />
                            {post.reposts.length}
                          </span>
                        </div>
                      </div>

                      {/* Caption badge */}
                      {post.caption && (
                        <div className="absolute top-2 left-2 right-2">
                          <p className="text-white text-xs bg-black/50 rounded-lg px-2 py-1 truncate backdrop-blur-sm">
                            {post.caption}
                          </p>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Memory stats */}
                <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
                  <span>{memory.posts.length} post{memory.posts.length !== 1 ? "s" : ""}</span>
                  <span>·</span>
                  <span>
                    {memory.posts.reduce((sum, p) => sum + p.likes.length, 0)} total likes
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Post detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="w-full max-w-sm bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal image */}
              <div className="relative">
                <img
                  src={getImageUrl(selected.image)}
                  className="w-full aspect-square object-cover"
                />

                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-gray-900 to-transparent" />

                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center text-white hover:bg-black transition"
                >
                  ×
                </button>
              </div>

              {/* Post info */}
              <div className="px-4 pb-5 -mt-2">
                {selected.caption && (
                  <p className="text-white text-sm mb-3">{selected.caption}</p>
                )}

                {/* Date */}
                <p className="text-gray-500 text-xs mb-4">
                  📅{" "}
                  {new Date(selected.createdAt).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-800 rounded-xl p-3 text-center">
                    <p className="text-lg font-black text-red-400">
                      {selected.likes.length}
                    </p>
                    <p className="text-xs text-gray-500">Likes</p>
                  </div>
                  <div className="flex-1 bg-gray-800 rounded-xl p-3 text-center">
                    <p className="text-lg font-black text-green-400">
                      {selected.reposts.length}
                    </p>
                    <p className="text-xs text-gray-500">Reposts</p>
                  </div>
                  <div className="flex-1 bg-gray-800 rounded-xl p-3 text-center">
                    <p className="text-lg font-black text-blue-400">
                      {selected.shareCount}
                    </p>
                    <p className="text-xs text-gray-500">Shares</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}