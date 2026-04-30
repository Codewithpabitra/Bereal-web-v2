import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Skeleton } from "../components/ui/Skeleton";
import { Avatar } from "../components/ui/Avatar";
import { getLeaderboardAPI } from "../api/posts";
import { getImageUrl } from "../utils/config";
import { type LeaderboardEntry, type Leaderboard } from "../types";
import { useAuth } from "../context/AuthContext";
import { Heart, Trophy, ArrowLeft, Clock } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const RANK_STYLES: Record<number, { bg: string; text: string; emoji: string; border: string }> = {
  1: { bg: "bg-yellow-500/20", text: "text-yellow-400", emoji: "🥇", border: "border-yellow-500/40" },
  2: { bg: "bg-gray-400/20", text: "text-gray-300", emoji: "🥈", border: "border-gray-400/40" },
  3: { bg: "bg-orange-600/20", text: "text-orange-400", emoji: "🥉", border: "border-orange-600/40" },
};

const getWeekRange = (start: string, end: string) => {
  const s = new Date(start).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const e = new Date(end).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${s} – ${e}`;
};

const getDaysLeft = () => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const daysLeft = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  return daysLeft;
};

export default function Leaderboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState<Leaderboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getLeaderboardAPI();
        setData(data);
      } catch {
        toast.error("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const myBestRank = data?.leaderboard.find(
    (e) => e.user._id === user?._id
  );

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
          <div className="flex-1">
            <h2 className="text-xl font-black text-white flex items-center gap-2">
              <Trophy size={20} className="text-yellow-400" />
              Weekly Leaderboard
            </h2>
            {data && (
              <p className="text-gray-500 text-xs mt-0.5">
                {getWeekRange(data.weekStart, data.weekEnd)} ·{" "}
                {getDaysLeft()} days left
              </p>
            )}
          </div>
        </div>

        {/* Your rank card */}
        {myBestRank && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-primary/10 border border-primary/30 rounded-2xl p-4 flex items-center gap-3"
          >
            <span className="text-2xl">
              {RANK_STYLES[myBestRank.rank]?.emoji || `#${myBestRank.rank}`}
            </span>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">
                You're #{myBestRank.rank} this week!
              </p>
              <p className="text-xs text-gray-400">
                {myBestRank.likeCount} likes on your best post
              </p>
            </div>
            <button
              onClick={() => setSelectedPost(myBestRank)}
              className="text-xs text-primary font-semibold hover:text-indigo-400 transition"
            >
              View post
            </button>
          </motion.div>
        )}

        {/* Stats row */}
        {data && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
              <p className="text-2xl font-black text-white">{data.totalPosts}</p>
              <p className="text-xs text-gray-500 mt-1">Posts this week</p>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 text-center">
              <p className="text-2xl font-black text-yellow-400">
                {data.leaderboard[0]?.likeCount || 0}
              </p>
              <p className="text-xs text-gray-500 mt-1">Top post likes</p>
            </div>
          </div>
        )}

        {/* Leaderboard list */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-gray-900 rounded-2xl border border-gray-800">
                <Skeleton className="w-8 h-8 rounded-full" />
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-2 w-20" />
                </div>
                <Skeleton className="w-12 h-12 rounded-xl" />
              </div>
            ))}
          </div>
        ) : data?.leaderboard.length === 0 ? (
          <div className="text-center py-20">
            <Trophy size={48} className="mx-auto mb-4 text-gray-700" />
            <p className="text-gray-500 text-lg font-semibold">
              No posts this week yet
            </p>
            <p className="text-gray-700 text-sm mt-2">
              Be the first to post and top the leaderboard!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {data?.leaderboard.map((entry, i) => {
              const rankStyle = RANK_STYLES[entry.rank];
              const isMe = entry.user._id === user?._id;

              return (
                <motion.div
                  key={entry.post._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-2xl border transition cursor-pointer hover:border-gray-600 ${
                    isMe
                      ? "bg-primary/10 border-primary/30"
                      : "bg-gray-900 border-gray-800"
                  }`}
                  onClick={() => setSelectedPost(entry)}
                >
                  {/* Rank */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-sm font-black border ${
                      rankStyle
                        ? `${rankStyle.bg} ${rankStyle.text} ${rankStyle.border}`
                        : "bg-gray-800 text-gray-400 border-gray-700"
                    }`}
                  >
                    {rankStyle ? rankStyle.emoji : `#${entry.rank}`}
                  </div>

                  {/* User avatar */}
                  <Link
                    to={`/profile/${entry.user._id}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Avatar
                      src={entry.user.avatar}
                      name={entry.user.name}
                      size="md"
                    />
                  </Link>

                  {/* User info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-white truncate">
                      {entry.user.name}
                      {isMe && (
                        <span className="ml-2 text-[10px] text-primary font-bold bg-primary/20 px-1.5 py-0.5 rounded-full">
                          YOU
                        </span>
                      )}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-red-400">
                        <Heart size={10} fill="currentColor" />
                        {entry.likeCount}
                      </span>
                      <span className="text-gray-700 text-xs">·</span>
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={10} />
                        {new Date(entry.post.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Post thumbnail */}
                  <img
                    src={getImageUrl(entry.post.image)}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover shrink-0 border border-gray-700"
                  />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Reset note */}
        <p className="text-center text-gray-700 text-xs mt-6">
          Leaderboard resets every Monday at midnight
        </p>
      </div>

      {/* Post detail modal */}
      {selectedPost && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-sm bg-gray-900 rounded-2xl overflow-hidden border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-800">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black border ${
                  RANK_STYLES[selectedPost.rank]
                    ? `${RANK_STYLES[selectedPost.rank].bg} ${RANK_STYLES[selectedPost.rank].text} ${RANK_STYLES[selectedPost.rank].border}`
                    : "bg-gray-800 text-gray-400 border-gray-700"
                }`}
              >
                {RANK_STYLES[selectedPost.rank]?.emoji || `#${selectedPost.rank}`}
              </div>
              <Avatar
                src={selectedPost.user.avatar}
                name={selectedPost.user.name}
                size="sm"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm text-white">
                  {selectedPost.user.name}
                </p>
                <p className="text-xs text-gray-500">
                  #{selectedPost.rank} this week
                </p>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-500 hover:text-white transition text-xl"
              >
                ×
              </button>
            </div>

            {/* Post image */}
            <img
              src={getImageUrl(selectedPost.post.image)}
              className="w-full aspect-square object-cover"
            />

            {/* Stats */}
            <div className="p-4">
              {selectedPost.post.caption && (
                <p className="text-sm text-gray-300 mb-3">
                  {selectedPost.post.caption}
                </p>
              )}
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-red-400 font-semibold">
                  <Heart size={16} fill="currentColor" />
                  {selectedPost.likeCount} likes
                </span>
                <span className="text-gray-500">
                  {new Date(selectedPost.post.createdAt).toLocaleDateString(
                    "en-US",
                    { month: "long", day: "numeric" }
                  )}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}