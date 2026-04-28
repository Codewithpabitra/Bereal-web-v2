import { useState, useRef, useEffect } from "react";
import { MoreHorizontal, Flag, Trash2, Link2 } from "lucide-react";
import { ReportModal } from "./ReportModal";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface PostMenuProps {
  postId: string;
  postUserId: string;
  postUserName: string;
  onDelete: () => void;
}

export const PostMenu = ({
  postId,
  postUserId,
  postUserName,
  onDelete,
}: PostMenuProps) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isOwner = user?._id === postUserId;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/post/${postId}`
    );
    toast.success("Link copied!");
    setOpen(false);
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen((p) => !p)}
          className="text-gray-500 hover:text-white transition p-1"
        >
          <MoreHorizontal size={18} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-8 z-30 bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl min-w-45"
            >
              {/* Copy link */}
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 transition text-left"
              >
                <Link2 size={15} />
                Copy link
              </button>

              {/* Report — only for other users' posts */}
              {!isOwner && (
                <button
                  onClick={() => {
                    setShowReport(true);
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-gray-800 transition text-left"
                >
                  <Flag size={15} />
                  Report post
                </button>
              )}

              {/* Delete — only for owner */}
              {isOwner && (
                <button
                  onClick={() => {
                    onDelete();
                    setOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-gray-800 transition text-left"
                >
                  <Trash2 size={15} />
                  Delete post
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ReportModal
        open={showReport}
        onClose={() => setShowReport(false)}
        type="post"
        targetId={postId}
        targetName={`${postUserName}'s post`}
      />
    </>
  );
};