import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Avatar } from "../components/ui/Avatar";
import { Skeleton } from "../components/ui/Skeleton";
import { getBlockedUsersAPI, toggleBlockAPI } from "../api/reports";
import { type User } from "../types";
import { UserX, ArrowLeft, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function BlockedUsers() {
  const navigate = useNavigate();
  const [blocked, setBlocked] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getBlockedUsersAPI();
        setBlocked(data);
      } catch {
        toast.error("Failed to load blocked users");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleUnblock = async (userId: string) => {
    try {
      await toggleBlockAPI(userId);
      setBlocked((prev) => prev.filter((u) => u._id !== userId));
      toast.success("User unblocked");
    } catch {
      toast.error("Failed to unblock");
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 pt-20 pb-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-white">Blocked Users</h2>
            <p className="text-gray-500 text-sm">
              {blocked.length} blocked account{blocked.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 p-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-2 w-20" />
                </div>
              </div>
            ))}
          </div>
        ) : blocked.length === 0 ? (
          <div className="text-center py-20">
            <UserX size={48} className="mx-auto mb-4 text-gray-700" />
            <p className="text-gray-500 text-lg">No blocked users</p>
            <p className="text-gray-700 text-sm mt-1">
              Users you block won't appear on your feed
            </p>
          </div>
        ) : (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden divide-y divide-gray-800">
            <AnimatePresence>
              {blocked.map((user) => (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 p-4"
                >
                  <Avatar src={user.avatar} name={user.name} size="md" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">Blocked</p>
                  </div>
                  <button
                    onClick={() => handleUnblock(user._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-700 text-gray-400 hover:border-green-500 hover:text-green-400 transition text-xs font-semibold"
                  >
                    <UserCheck size={12} />
                    Unblock
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}