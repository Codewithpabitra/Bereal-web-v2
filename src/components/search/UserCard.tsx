import { useState } from "react";
import { Link } from "react-router-dom";
import { type User } from "../../types";
import { Avatar } from "../ui/Avatar";
import { followUserAPI } from "../../api/users";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

import { getImageUrl } from "../../utils/config";

export const UserCard = ({ user }: { user: User }) => {
  const { user: me } = useAuth();
  const [following, setFollowing] = useState(
    user.followers?.some((f: any) => f === me?._id || f._id === me?._id)
  );
  const [loading, setLoading] = useState(false);

  const handleFollow = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await followUserAPI(user._id);
      setFollowing((f) => !f);
      toast.success(following ? "Unfollowed" : "Following!");
    } catch {
      toast.error("Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      to={`/profile/${user._id}`}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
    >
      <Avatar
        src={user.avatar ? `${getImageUrl}${user.avatar}` : ""}
        name={user.name}
        size="md"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-white truncate">{user.name}</p>
        {user.bio && (
          <p className="text-xs text-gray-500 truncate">{user.bio}</p>
        )}
        <p className="text-xs text-gray-600">
          {user.followers?.length || 0} followers
        </p>
      </div>
      <button
        onClick={handleFollow}
        disabled={loading}
        className={`px-4 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
          following
            ? "border border-gray-600 text-gray-400 hover:border-red-500 hover:text-red-400"
            : "text-white"
        }`}
        style={!following ? { backgroundColor: "#6C63FF" } : {}}
      >
        {loading ? "..." : following ? "Following" : "Follow"}
      </button>
    </Link>
  );
};