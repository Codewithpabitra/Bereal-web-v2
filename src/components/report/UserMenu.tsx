import { useState } from "react";
import { toggleBlockAPI } from "../../api/reports";
import { ReportModal } from "./ReportModal";
import { Flag, UserX, UserCheck, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface UserMenuProps {
  userId: string;
  userName: string;
  isBlocked: boolean;
  onBlockToggle: (blocked: boolean) => void;
}

export const UserMenu = ({
  userId,
  userName,
  isBlocked,
  onBlockToggle,
}: UserMenuProps) => {
  const [open, setOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [blockLoading, setBlockLoading] = useState(false);

  const handleBlock = async () => {
    setBlockLoading(true);
    try {
      const { data } = await toggleBlockAPI(userId);
      onBlockToggle(data.blocked);
      toast.success(data.blocked ? "User blocked" : "User unblocked");
      setOpen(false);
    } catch {
      toast.error("Failed");
    } finally {
      setBlockLoading(false);
    }
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setOpen((p) => !p)}
          className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition"
        >
          <MoreHorizontal size={18} className="text-white" />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-12 z-30 bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl min-w-45"
            >
              {/* Block */}
              <button
                onClick={handleBlock}
                disabled={blockLoading}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-800 transition text-left text-red-400"
              >
                {isBlocked ? (
                  <>
                    <UserCheck size={15} />
                    Unblock user
                  </>
                ) : (
                  <>
                    <UserX size={15} />
                    Block user
                  </>
                )}
              </button>

              {/* Report */}
              <button
                onClick={() => {
                  setShowReport(true);
                  setOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-gray-800 transition text-left"
              >
                <Flag size={15} />
                Report user
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ReportModal
        open={showReport}
        onClose={() => setShowReport(false)}
        type="user"
        targetId={userId}
        targetName={userName}
      />
    </>
  );
};