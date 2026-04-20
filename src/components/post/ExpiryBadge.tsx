import { useCountdown } from "../../hooks/useCountdown";
import { Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ExpiryBadge = ({ expiresAt }: { expiresAt: string }) => {
  const timeLeft = useCountdown(expiresAt);

  // Post expired
  if (!timeLeft) {
    return (
      <span className="flex items-center gap-1 text-xs text-gray-600 font-medium">
        <Clock size={12} />
        Expired
      </span>
    );
  }

  const { hours, minutes, seconds, diff } = timeLeft;

  // Under 1 hour — show red + seconds
  const isUrgent = diff < 60 * 60 * 1000;
  // Under 3 hours — show orange
  const isWarning = diff < 3 * 60 * 60 * 1000;

  const color = isUrgent
    ? "text-red-500"
    : isWarning
    ? "text-orange-400"
    : "text-gray-400";

  const label = isUrgent
    ? `${minutes}m ${seconds}s left`
    : `${hours}h ${minutes}m left`;

  return (
    <AnimatePresence>
      <motion.span
        key={label}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        className={`flex items-center gap-1 text-xs font-medium ${color}`}
      >
        <Clock size={12} />
        {label}

        {/* Pulse dot when urgent */}
        {isUrgent && (
          <span className="relative flex h-2 w-2 ml-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
          </span>
        )}
      </motion.span>
    </AnimatePresence>
  );
};