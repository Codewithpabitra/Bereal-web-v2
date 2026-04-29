import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import { useNotifications } from "../../hooks/useNotifications";
import { Home, Compass, Bookmark, Bell, Archive } from "lucide-react";
import { motion } from "framer-motion";

interface NavItem {
  path: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

export const BottomNav = () => {
  const location = useLocation();
  //   const { user } = useAuth();
  const { unreadCount } = useNotifications();

  const navItems: NavItem[] = [
    {
      path: "/feed",
      icon: Home,
      label: "Home",
    },
    {
      path: "/explore",
      icon: Compass,
      label: "Explore",
    },
    {
      path: "/notifications",
      icon: Bell,
      label: "Alerts",
      badge: unreadCount,
    },
    {
      path: "/saved",
      icon: Bookmark,
      label: "Saved",
    },
    {
      path: "/archive",
      icon: Archive,
      label: "Archive",
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-black border-t border-gray-800 pb-safe">
      <div className="max-w-2xl mx-auto px-2 h-16 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full"
            >
              {/* Active indicator bar at top */}
              {active && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full"
                  style={{ backgroundColor: "#6C63FF" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              {/* Icon with badge */}
              <div className="relative flex items-center justify-center w-8 h-8">
                <Icon
                  size={22}
                  className={`transition-colors duration-200 ${
                    active ? "text-white" : "text-gray-500"
                  }`}
                  fill={active ? "currentColor" : "none"}
                  strokeWidth={active ? 2.5 : 1.5}
                />

                {/* Fixed badge — positioned relative to the wrapper div */}
                {item.badge && item.badge > 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-white text-[9px] font-black min-w-4 h-4 rounded-full flex items-center justify-center px-1"
                    style={{ backgroundColor: "#6C63FF" }}
                  >
                    { item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[12px] font-medium transition-colors duration-200 ${
                  active ? "text-white" : "text-gray-600"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
