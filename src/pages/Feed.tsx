import { Navbar } from "../components/layout/Navbar";
import { PostCard } from "../components/post/PostCard";
import { CreatePost } from "../components/post/CreatePost";
import { Spinner } from "../components/ui/Spinner";
import { usePosts } from "../hooks/usePosts";

export default function Feed() {
  const { posts, loading, fetchFeed, likePost, repostPost, sharePost, deletePost } = usePosts();

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 pt-20 pb-10">
        <CreatePost onCreated={fetchFeed} />
        {loading ? (
          <Spinner />
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg">No posts yet.</p>
            <p className="text-sm mt-1">Be the first to post something!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
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