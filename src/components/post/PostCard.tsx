import { useState } from "react";
import { Link } from "react-router-dom";
import { type Post } from "../../types";
import { Avatar } from "../ui/Avatar";
import { PostActions } from "./PostActions";
import { CommentSection } from "./CommentSection";
import { ExpiryBadge } from "./ExpiryBadge";
// import { useAuth } from "../../context/AuthContext";
import { Repeat2 } from "lucide-react";
import { formatDistanceToNow } from "../../utils/time";
import { ReactionPicker } from "./ReactionPicker";

import { getImageUrl } from "../../utils/config";
import { Caption } from "./Caption";
import { PostMenu } from "../report/PostMenu";

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
  onRepost: (id: string) => void;
  onShare: (id: string) => void;
  onDelete: (id: string) => void;
}

export const PostCard = ({
  post,
  onLike,
  onRepost,
  onShare,
  onDelete,
}: PostCardProps) => {
  // const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
      {/* Repost banner */}
      {post.isRepost && (
        <div className="flex items-center gap-2 px-4 pt-3 text-green-400 text-sm">
          <Repeat2 size={14} />
          <span>Reposted</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <Link
          to={`/profile/${post.user._id}`}
          className="flex items-center gap-3 hover:opacity-80 transition"
        >
          <Avatar src={post.user.avatar} name={post.user.name} size="md" />
          <div>
            <p className="font-semibold text-sm">{post.user.name}</p>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(post.createdAt)}
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {/* ✅ Expiry badge */}
          <ExpiryBadge expiresAt={post.expiresAt} />

          <PostMenu
            postId={post._id}
            postUserId={post.user._id}
            postUserName={post.user.name}
            onDelete={() => onDelete(post._id)}
          />
        </div>
      </div>

      {/* Image */}
      <img
        src={getImageUrl(post.image)}
        alt="post"
        className="w-full aspect-square object-cover"
      />

      {/* Caption + Actions */}
      <div className="px-4 py-3">
        {post.caption && (
          <Caption text={post.caption} authorName={post.user.name} />
        )}

        <PostActions
          post={post}
          onLike={() => onLike(post._id)}
          onRepost={() => onRepost(post._id)}
          onShare={() => onShare(post._id)}
          showComments={showComments}
          onToggleComments={() => setShowComments((p) => !p)}
        />

        {/* emojis section */}
        <div className="mt-2">
          <ReactionPicker postId={post._id} />
        </div>

        {showComments && <CommentSection postId={post._id} />}
      </div>
    </div>
  );
};
