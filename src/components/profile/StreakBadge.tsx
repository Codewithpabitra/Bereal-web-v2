import { Flame } from "lucide-react";
import { motion } from "framer-motion";

interface StreakBadgeProps {
  currentStreak: number;
  longestStreak: number;
}

export const StreakBadge = ({ currentStreak, longestStreak }: StreakBadgeProps) => {
  const isHot = currentStreak >= 3;
  const isOnFire = currentStreak >= 7;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-900 border border-gray-800 rounded-2xl p-4"
    >
      <div className="flex items-center justify-between">
        {/* Current streak */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={isOnFire ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isOnFire
                ? "bg-orange-500/20"
                : isHot
                ? "bg-yellow-500/20"
                : "bg-gray-800"
            }`}
          >
            <Flame
              size={24}
              className={
                isOnFire
                  ? "text-orange-400"
                  : isHot
                  ? "text-yellow-400"
                  : "text-gray-600"
              }
              fill={isHot ? "currentColor" : "none"}
            />
          </motion.div>
          <div>
            <p className="text-2xl font-black text-white">
              {currentStreak}
              <span className="text-sm font-normal text-gray-400 ml-1">
                day{currentStreak !== 1 ? "s" : ""}
              </span>
            </p>
            <p className="text-xs text-gray-500">Current streak</p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-800" />

        {/* Longest streak */}
        <div className="text-right">
          <p className="text-lg font-bold text-gray-300">
            {longestStreak}
            <span className="text-sm font-normal text-gray-500 ml-1">days</span>
          </p>
          <p className="text-xs text-gray-500">Best streak</p>
        </div>
      </div>

      {/* Streak message */}
      {currentStreak > 0 && (
        <div
          className={`mt-3 pt-3 border-t border-gray-800 text-xs text-center font-medium ${
            isOnFire
              ? "text-orange-400"
              : isHot
              ? "text-yellow-400"
              : "text-gray-500"
          }`}
        >
          {isOnFire
            ? "🔥 You're on fire! Keep it going!"
            : isHot
            ? "⚡ Great streak! Don't break it!"
            : "📸 Post daily to build your streak!"}
        </div>
      )}

      {currentStreak === 0 && (
        <p className="mt-3 pt-3 border-t border-gray-800 text-xs text-center text-gray-600">
          Post today to start your streak!
        </p>
      )}
    </motion.div>
  );
};