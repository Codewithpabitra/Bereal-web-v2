import { useState } from "react";
import { usePWAInstall } from "../../hooks/usePWAInstall";
import { Download, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const InstallBanner = () => {
  const { installPrompt, isInstalled, isInstalling, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(
    localStorage.getItem("pwa_banner_dismissed") === "true"
  );

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("pwa_banner_dismissed", "true");
  };

  // Don't show if installed, dismissed, or no prompt available
  if (isInstalled || dismissed || !installPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-16 left-0 right-0 z-30 px-4"
      >
        <div className="max-w-xl mx-auto">
          <div className="bg-gray-900 border border-primary/40 rounded-2xl p-4 flex items-center gap-3 shadow-2xl">
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg font-black text-white"
              style={{ backgroundColor: "#6C63FF" }}
            >
              C
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white">
                Install Candid
              </p>
              <p className="text-xs text-gray-400">
                Add to homescreen for the best experience
              </p>
            </div>

            {/* Install button */}
            <button
              onClick={install}
              disabled={isInstalling}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white text-xs font-bold shrink-0 transition active:scale-95 disabled:opacity-50"
              style={{ backgroundColor: "#6C63FF" }}
            >
              <Download size={12} />
              {isInstalling ? "Installing..." : "Install"}
            </button>

            {/* Dismiss */}
            <button
              onClick={handleDismiss}
              className="text-gray-600 hover:text-gray-400 transition shrink-0"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};