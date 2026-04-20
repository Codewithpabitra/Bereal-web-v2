import { type Post } from "../../types";
import { PostCard } from "../post/PostCard";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  post: Post;
  onClose: () => void;
}

export const ExplorePostModal = ({ post, onClose }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
          <PostCard
            post={post}
            onLike={() => {}}
            onRepost={() => {}}
            onShare={() => {}}
            onDelete={() => {}}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};