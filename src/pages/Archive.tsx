import { useState, useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { getArchiveAPI } from "../api/posts";
import { type Post } from "../types";
import { getImageUrl } from "../utils/config";
import { Clock, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "../utils/time";
import toast from "react-hot-toast";
import { Skeleton } from "../components/ui/Skeleton";

export default function Archive() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Post | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getArchiveAPI();
        setPosts(data);
      } catch {
        toast.error("Failed to load archive");
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
          <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center">
            <Lock size={18} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Your Archive</h2>
            <p className="text-gray-500 text-sm">
              Only you can see these expired posts
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-3 gap-0.5 rounded-2xl overflow-hidden">
            {Array.from({ length: 9 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-none" />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            <Clock size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg text-gray-500">No archived posts yet</p>
            <p className="text-sm mt-1">
              Posts older than 24hrs will appear here
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 text-sm mb-4">
              {posts.length} archived post{posts.length !== 1 ? "s" : ""}
            </p>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-0.5 rounded-2xl overflow-hidden">
              {posts.map((post, i) => (
                <motion.button
                  key={post._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(post)}
                  className="relative aspect-square overflow-hidden group"
                >
                  <img
                    src={getImageUrl(post.image)}
                    alt=""
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-end p-1.5">
                    <span className="text-white text-[10px] opacity-70">
                      {formatDistanceToNow(post.createdAt)}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </>
        )}

        {/* Post detail modal */}
        {selected && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-sm bg-gray-900 rounded-2xl overflow-hidden border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={getImageUrl(selected.image)}
                className="w-full aspect-square object-cover"
              />
              <div className="p-4">
                {selected.caption && (
                  <p className="text-white text-sm mb-2">{selected.caption}</p>
                )}
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>
                      Posted {formatDistanceToNow(selected.createdAt)}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>❤️ {selected.likes.length}</span>
                    <span>💬 Comments</span>
                    <span>🔁 {selected.reposts.length}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
