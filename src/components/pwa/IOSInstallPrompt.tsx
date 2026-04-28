import { useState, useEffect } from "react";
import { Share2, X, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const isIOS = () =>
  /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase());

const isInStandaloneMode = () =>
  window.matchMedia("(display-mode: standalone)").matches;

export const IOSInstallPrompt = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("ios_prompt_dismissed");
    if (isIOS() && !isInStandaloneMode() && !dismissed) {
      // Show after 3 seconds
      const timer = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem("ios_prompt_dismissed", "true");
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="fixed bottom-6 left-4 right-4 z-50"
        >
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-5 shadow-2xl">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black"
                  style={{ backgroundColor: "#6C63FF" }}
                >
                  C
                </div>
                <div>
                  <p className="font-bold text-white text-sm">
                    Install Candid
                  </p>
                  <p className="text-gray-400 text-xs">
                    Get the full app experience
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-600 hover:text-gray-400"
              >
                <X size={18} />
              </button>
            </div>

            {/* Steps */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                  <Share2 size={13} className="text-primary" />
                </div>
                <p className="text-sm text-gray-300">
                  Tap the{" "}
                  <span className="font-bold text-white">Share</span> button
                  in Safari
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                  <Plus size={13} className="text-primary" />
                </div>
                <p className="text-sm text-gray-300">
                  Tap{" "}
                  <span className="font-bold text-white">
                    Add to Home Screen
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gray-800 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-primary">✓</span>
                </div>
                <p className="text-sm text-gray-300">
                  Tap{" "}
                  <span className="font-bold text-white">Add</span> — done!
                </p>
              </div>
            </div>

            {/* Arrow pointing down to Safari bar */}
            <div className="flex justify-center mt-3">
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-4 bg-gray-700" />
                <div className="w-3 h-3 border-b-2 border-r-2 border-gray-700 rotate-45 -mt-1.5" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};