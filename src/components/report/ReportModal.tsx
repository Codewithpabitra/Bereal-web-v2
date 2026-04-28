import { useState } from "react";
import { Modal } from "../ui/Modal";
import { reportPostAPI, reportUserAPI } from "../../api/reports";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const REASONS = [
  { value: "spam", label: "Spam", emoji: "🚫" },
  { value: "inappropriate", label: "Inappropriate content", emoji: "🔞" },
  { value: "harassment", label: "Harassment or bullying", emoji: "😡" },
  { value: "hate_speech", label: "Hate speech", emoji: "💢" },
  { value: "violence", label: "Violence", emoji: "⚠️" },
  { value: "fake_account", label: "Fake account", emoji: "🤖" },
  { value: "other", label: "Other", emoji: "📝" },
];

interface ReportModalProps {
  open: boolean;
  onClose: () => void;
  type: "post" | "user";
  targetId: string;
  targetName?: string;
}

export const ReportModal = ({
  open,
  onClose,
  type,
  targetId,
  targetName,
}: ReportModalProps) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!reason) return toast.error("Please select a reason");
    setLoading(true);
    try {
      if (type === "post") {
        await reportPostAPI(targetId, reason, details);
      } else {
        await reportUserAPI(targetId, reason, details);
      }
      setSubmitted(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setReason("");
    setDetails("");
    setSubmitted(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={submitted ? "" : `Report ${type === "post" ? "Post" : "Account"}`}
    >
      {submitted ? (
        // Success state
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-6"
        >
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✅</span>
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            Report Submitted
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Thanks for keeping Candid safe. We'll review this report and take
            action if needed.
          </p>
          <button
            onClick={handleClose}
            className="w-full py-3 rounded-xl font-bold text-white"
            style={{ backgroundColor: "#6C63FF" }}
          >
            Done
          </button>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {/* Target info */}
          {targetName && (
            <div className="flex items-center gap-2 bg-gray-800 rounded-xl px-3 py-2">
              <AlertTriangle size={14} className="text-yellow-400" />
              <p className="text-sm text-gray-300">
                Reporting{" "}
                <span className="font-semibold text-white">{targetName}</span>
              </p>
            </div>
          )}

          {/* Reason selection */}
          <div>
            <p className="text-sm text-gray-400 mb-3">
              Why are you reporting this?
            </p>
            <div className="space-y-2">
              {REASONS.map((r) => (
                <button
                  key={r.value}
                  onClick={() => setReason(r.value)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition text-left ${
                    reason === r.value
                      ? "border-primary bg-primary/20"
                      : "border-gray-700 bg-gray-800 hover:border-gray-600"
                  }`}
                >
                  <span className="text-lg">{r.emoji}</span>
                  <span className="text-sm text-white font-medium">
                    {r.label}
                  </span>
                  {reason === r.value && (
                    <span className="ml-auto text-primary">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Optional details */}
          {reason && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Add more details (optional)..."
                maxLength={500}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-primary transition resize-none text-sm"
              />
              <p className="text-right text-gray-600 text-xs mt-1">
                {details.length}/500
              </p>
            </motion.div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!reason || loading}
            className="w-full py-3 rounded-xl font-bold text-white transition disabled:opacity-40"
            style={{ backgroundColor: "#6C63FF" }}
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>

          <p className="text-center text-gray-600 text-xs">
            False reports may result in your account being restricted
          </p>
        </div>
      )}
    </Modal>
  );
};