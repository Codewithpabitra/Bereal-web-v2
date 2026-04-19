import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../ui/Avatar";
import { Home, Bookmark, LogOut } from "lucide-react";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-gray-800">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/feed" className="text-xl font-black text-white tracking-tight">
          BeReal.
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/feed" className="text-gray-400 hover:text-white transition">
            <Home size={22} />
          </Link>
          <Link to="/saved" className="text-gray-400 hover:text-white transition">
            <Bookmark size={22} />
          </Link>
          <Link to={`/profile/${user?._id}`}>
            <Avatar src={user?.avatar} name={user?.name || ""} size="sm" />
          </Link>
          <button onClick={handleLogout} className="text-gray-400 hover:text-red-400 transition">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};