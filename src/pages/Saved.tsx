import { Navbar } from "../components/layout/Navbar";
import { PostCard } from "../components/post/PostCard";
import { PostCardSkeleton } from "../components/ui/PostCardSkeleton";
import { useSaved } from "../hooks/useSaved";

export default function Saved() {
  const { saved, loading } = useSaved();

  const validSaved = saved.filter(Boolean);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 pt-20 pb-24">
        <h2 className="text-xl font-bold mb-6">
          Saved Posts{" "}
          <span className="text-gray-500 text-base font-normal">
            ({validSaved.length})
          </span>
        </h2>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <PostCardSkeleton key={i} />
            ))}
          </div>
        ) : validSaved.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg">No saved posts yet.</p>
            <p className="text-sm mt-1">
              Tap the bookmark icon on any post to save it.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {validSaved.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                onLike={() => {}}
                onRepost={() => {}}
                onShare={() => {}}
                onDelete={() => {}}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
