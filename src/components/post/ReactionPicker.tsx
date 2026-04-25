import { useState } from "react";
import { useReactions } from "../../hooks/useReactions";
import { Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ReactionPicker = ({ postId }: { postId: string }) => {
  const { grouped, total, myReaction, react, EMOJIS } = useReactions(postId);
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      {/* Reaction summary row */}
      <div className="flex items-center gap-2 flex-wrap">

        {/* Existing reactions */}
        {Object.entries(grouped).map(([emoji, users]) => (
          <motion.button
            key={emoji}
            whileTap={{ scale: 0.85 }}
            onClick={() => react(emoji)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm border transition ${
              myReaction === emoji
                ? "border-primary bg-primary/20 text-white"
                : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-500"
            }`}
          >
            <span>{emoji}</span>
            <span className="text-xs font-semibold">{users.length}</span>
          </motion.button>
        ))}

        {/* Add reaction button */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={() => setShowPicker((p) => !p)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-sm border transition ${
            showPicker
              ? "border-primary bg-primary/20 text-white"
              : "border-gray-700 bg-gray-800 text-gray-400 hover:border-gray-500"
          }`}
        >
          <Smile size={14} />
          {!myReaction && total === 0 && (
            <span className="text-xs">React</span>
          )}
        </motion.button>
      </div>

      {/* Emoji picker popup */}
      <AnimatePresence>
        {showPicker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-10 left-0 z-20 bg-gray-900 border border-gray-700 rounded-2xl p-2 flex gap-1 shadow-2xl"
          >
            {EMOJIS.map((emoji) => (
              <motion.button
                key={emoji}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  react(emoji);
                  setShowPicker(false);
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl transition ${
                  myReaction === emoji
                    ? "bg-primary/30"
                    : "hover:bg-gray-800"
                }`}
              >
                {emoji}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};