import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../ui/Avatar";
import { Home, Bookmark, LogOut, Compass, Bell, Archive } from "lucide-react";
import { useNotifications } from "../../hooks/useNotifications";

// socket
import { useSocket } from "../../context/SocketContext";

import { getMeAPI } from "../../api/auth";
import { useEffect } from "react";

export const Navbar = () => {
  const { user, logout , updateUser } = useAuth();
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();
  const { onlineCount } = useSocket(); // how many users are online

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Verify current user when user changes
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { data } = await getMeAPI();
        // Only update if same user
        if (user && data._id === user._id) {
          updateUser({ ...user, ...data });
        }
      } catch {
        // Token expired or invalid — logout
        logout();
        navigate("/login");
      }
    };
    if (user) verifyUser();
  }, [user?._id]); // Re-run when user changes

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-gray-800">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            to="/feed"
            className="text-xl font-black text-white tracking-tight"
          >
            Candid<span className="text-primary">.</span>
          </Link>
          {/* ✅ Online count */}
          {onlineCount > 0 && (
            <div className="flex items-center gap-1.5 bg-gray-900 border border-gray-800 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-400">
                {onlineCount} online
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/feed"
            className="text-gray-400 hover:text-white transition"
          >
            <Home size={22} />
          </Link>
          <Link
            to="/explore"
            className="text-gray-400 hover:text-white transition"
          >
            <Compass size={22} />
          </Link>
          <Link
            to="/saved"
            className="text-gray-400 hover:text-white transition"
          >
            <Bookmark size={22} />
          </Link>

          <Link
            to="/archive"
            className="text-gray-400 hover:text-white transition"
          >
            <Archive size={22} />
          </Link>

          {/* Bell with badge */}
          <Link
            to="/notifications"
            className="relative text-gray-400 hover:text-white transition"
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#6C63FF" }}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Link>

          <Link to={`/profile/${user?._id}`}>
            <Avatar src={user?.avatar} name={user?.name || ""} size="sm" />
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 transition"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};
