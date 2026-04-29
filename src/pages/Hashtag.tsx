import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { PostCard } from "../components/post/PostCard";
import { PostCardSkeleton } from "../components/ui/PostCardSkeleton";
import { getPostsByHashtagAPI } from "../api/posts";
import { usePosts } from "../hooks/usePosts";
import { type Post } from "../types";
import { Hash, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Hashtag() {
  const { tag } = useParams<{ tag: string }>();
  const navigate = useNavigate();
  const { likePost, repostPost, sharePost, deletePost } = usePosts();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getPostsByHashtagAPI(tag!);
        setPosts(data.posts);
      } catch {
        toast.error("Failed to load hashtag posts");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [tag]);

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
          <div className="flex items-center gap-2 flex-1">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#6C63FF22" }}
            >
              <Hash size={18} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">#{tag}</h2>
              <p className="text-gray-500 text-xs">
                {loading ? "Loading..." : `${posts.length} active posts`}
              </p>
            </div>
          </div>
        </div>

        {/* Posts */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "#6C63FF22" }}
            >
              <Hash size={32} className="text-primary" />
            </div>
            <p className="text-gray-400 text-lg font-semibold">
              No posts yet for #{tag}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Be the first to post with this hashtag!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {posts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <PostCard
                  post={post}
                  onLike={likePost}
                  onRepost={repostPost}
                  onShare={sharePost}
                  onDelete={deletePost}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}