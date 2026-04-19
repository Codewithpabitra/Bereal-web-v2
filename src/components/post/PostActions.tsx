import { useState } from "react";
import { Heart, MessageCircle, Repeat2, Share2, Bookmark } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { toggleSaveAPI } from "../../api/saved";
import { type Post } from "../../types";
import toast from "react-hot-toast";

interface PostActionsProps {
  post: Post;
  onLike: () => void;
  onRepost: () => void;
  onShare: () => void;
  showComments: boolean;
  onToggleComments: () => void;
}

export const PostActions = ({
  post,
  onLike,
  onRepost,
  onShare,
  showComments,
  onToggleComments,
}: PostActionsProps) => {
  const { user } = useAuth();
  const isLiked = post.likes.includes(user?._id || "");
  const isReposted = post.reposts.includes(user?._id || "");

  // ✅ Track saved state locally
  const [isSaved, setIsSaved] = useState(false);
  const [savingLoading, setSavingLoading] = useState(false);

  const handleSave = async () => {
    if (savingLoading) return;
    setSavingLoading(true);
    try {
      const { data } = await toggleSaveAPI(post._id);
      setIsSaved(data.saved); // ✅ update icon based on response
      toast.success(data.saved ? "Post saved!" : "Post unsaved");
    } catch {
      toast.error("Failed to save post");
    } finally {
      setSavingLoading(false);
    }
  };

  const handleShare = async () => {
    onShare();
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/post/${post._id}`
      );
      toast.success("Link copied!");
    } catch {
      toast.error("Could not copy link");
    }
  };

  return (
    <div className="flex items-center gap-4 mt-3">
      {/* Like */}
      <button
        onClick={onLike}
        className={`flex items-center gap-1 text-sm transition ${
          isLiked ? "text-red-500" : "text-gray-400 hover:text-red-400"
        }`}
      >
        <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
        <span>{post.likes.length}</span>
      </button>

      {/* Comment */}
      <button
        onClick={onToggleComments}
        className={`flex items-center gap-1 text-sm transition ${
          showComments ? "text-primary" : "text-gray-400 hover:text-primary"
        }`}
      >
        <MessageCircle size={18} fill={showComments ? "currentColor" : "none"} />
      </button>

      {/* Repost */}
      <button
        onClick={onRepost}
        className={`flex items-center gap-1 text-sm transition ${
          isReposted ? "text-green-400" : "text-gray-400 hover:text-green-400"
        }`}
      >
        <Repeat2 size={18} />
        <span>{post.reposts.length}</span>
      </button>

      {/* Share */}
      <button
        onClick={handleShare}
        className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition"
      >
        <Share2 size={18} />
        <span>{post.shareCount}</span>
      </button>

      {/* Save ✅ icon fills when saved */}
      <button
        onClick={handleSave}
        disabled={savingLoading}
        className={`ml-auto transition ${
          isSaved ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
        }`}
      >
        <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
      </button>
    </div>
  );
};