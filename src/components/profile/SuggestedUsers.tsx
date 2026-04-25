import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSuggestedUsersAPI, followUserAPI } from "../../api/users";
import { Avatar } from "../ui/Avatar";
import { type User } from "../../types";
import { UserPlus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export const SuggestedUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [following, setFollowing] = useState<Record<string, boolean>>({});
  const [dismissed, setDismissed] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getSuggestedUsersAPI();
        setUsers(data);
      } catch {}
    };
    fetch();
  }, []);

  const handleFollow = async (id: string) => {
    try {
      await followUserAPI(id);
      setFollowing((prev) => ({ ...prev, [id]: true }));
      toast.success("Following!");
    } catch {
      toast.error("Failed to follow");
    }
  };

  const handleDismiss = (id: string) => {
    setDismissed((prev) => [...prev, id]);
  };

  const visible = users.filter((u) => !dismissed.includes(u._id));

  if (visible.length === 0) return null;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus size={16} className="text-primary" />
        <p className="text-sm font-bold text-white">People you may know</p>
      </div>

      <div className="space-y-3">
        <AnimatePresence>
          {visible.map((user) => (
            <motion.div
              key={user._id}
              initial={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <Link
                to={`/profile/${user._id}`}
                className="flex items-center gap-3 flex-1 min-w-0 hover:opacity-80 transition"
              >
                <Avatar src={user.avatar} name={user.name} size="sm" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user.followers?.length || 0} followers
                  </p>
                </div>
              </Link>

              <div className="flex items-center gap-2 shrink-0">
                {following[user._id] ? (
                  <span className="text-xs text-green-400 font-semibold">
                    Following ✓
                  </span>
                ) : (
                  <button
                    onClick={() => handleFollow(user._id)}
                    className="text-xs font-bold text-white px-3 py-1.5 rounded-full transition"
                    style={{ backgroundColor: "#6C63FF" }}
                  >
                    Follow
                  </button>
                )}
                <button
                  onClick={() => handleDismiss(user._id)}
                  className="text-gray-600 hover:text-gray-400 transition"
                >
                  <X size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};