import { Navbar } from "../components/layout/Navbar";
import { PostCard } from "../components/post/PostCard";
import { CreatePost } from "../components/post/CreatePost";
import { usePosts } from "../hooks/usePosts";
import { Archive } from "lucide-react";
import { Link } from "react-router-dom";
import { SuggestedUsers } from "../components/profile/SuggestedUsers";
import { InviteCard } from "../components/invite/InviteCard";
import { SuggestedUsersSkeleton } from "../components/ui/SuggestedUsersSkeleton";
import { PostCardSkeleton } from "../components/ui/PostCardSkeleton";

export default function Feed() {
  const {
    posts,
    loading,
    fetchFeed,
    likePost,
    repostPost,
    sharePost,
    deletePost,
  } = usePosts();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 pt-20 pb-24">
        <Link
          to="/archive"
          className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-2xl px-4 py-3 mb-4 hover:border-primary transition group"
        >
          <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-primary/20 transition">
            <Archive size={16} className="text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Your Archive</p>
            <p className="text-xs text-gray-500">
              Posts older than 24hrs are saved here privately
            </p>
          </div>
          <span className="text-gray-600 text-2xl">›</span>
        </Link>

        {/* suggested users  */}
        <SuggestedUsers />

        {/* Invite card — show only if few posts */}
        {posts.length < 3 && <InviteCard />}

        <CreatePost onCreated={fetchFeed} />
        {loading ? (
          <div className="space-y-4">
            <SuggestedUsersSkeleton />
            {[1, 2, 3].map((i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg">No posts yet.</p>
            <p className="text-sm mt-1">Be the first to post something!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onLike={likePost}
                onRepost={repostPost}
                onShare={sharePost}
                onDelete={deletePost}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
