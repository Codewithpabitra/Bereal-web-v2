import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link2, Share2, Check } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export const InviteCard = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const inviteLink = `${window.location.origin}/register?ref=${user?._id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast.success("Invite link copied!");
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("Could not copy link");
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Join me on Candid!",
        text: `Hey! I'm using Candid — a social app where posts vanish in 24hrs. Join me! 📸`,
        url: inviteLink,
      });
    } else {
      handleCopy();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-linear-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-2xl p-5 mb-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">🎉</div>
        <div>
          <p className="font-bold text-white text-sm">
            Invite friends to Candid
          </p>
          <p className="text-gray-400 text-xs">
            Share real moments together
          </p>
        </div>
      </div>

      {/* Link box */}
      <div className="bg-black/40 rounded-xl px-3 py-2.5 flex items-center gap-2 mb-3">
        <Link2 size={14} className="text-primary shrink-0" />
        <p className="text-gray-400 text-xs truncate flex-1">{inviteLink}</p>
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition ${
            copied
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "bg-gray-800 text-white hover:bg-gray-700 border border-gray-700"
          }`}
        >
          {copied ? (
            <>
              <Check size={14} />
              Copied!
            </>
          ) : (
            <>
              <Link2 size={14} />
              Copy Link
            </>
          )}
        </button>

        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition"
          style={{ backgroundColor: "#6C63FF" }}
        >
          <Share2 size={14} />
          Share
        </button>
      </div>
    </motion.div>
  );
};