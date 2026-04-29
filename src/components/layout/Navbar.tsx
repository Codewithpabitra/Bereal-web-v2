import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../ui/Avatar";
import { LogOut } from "lucide-react";
// import { useNotifications } from "../../hooks/useNotifications";
import { useSocket } from "../../context/SocketContext";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  // const { unreadCount } = useNotifications();
  const { onlineCount } = useSocket();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-gray-800">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Left — Logo */}
        <Link
          to="/feed"
          className="text-xl font-black text-white tracking-tight"
        >
          Candid<span className="text-primary">.</span>
        </Link>

        {/* Right — Online count + Profile + Logout */}
        <div className="flex items-center gap-3">

          {/* Online count */}
          {onlineCount > 0 && (
            <div className="flex items-center gap-1.5 bg-gray-900 border border-gray-800 rounded-full px-2.5 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-gray-400">
                {onlineCount} online
              </span>
            </div>
          )}

          {/* Profile avatar */}
          <Link to={`/profile/${user?._id}`}>
            <Avatar src={user?.avatar} name={user?.name || ""} size="sm" />
          </Link>

          {/* Logout */}
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