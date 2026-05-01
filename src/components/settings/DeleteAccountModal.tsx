import { useState } from "react";
import { Modal } from "../ui/Modal";
import { deleteAccountAPI } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Eye, EyeOff, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CONFIRM_TEXT = "delete my account";

export const DeleteAccountModal = ({ open, onClose }: Props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmText, setConfirmText] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setStep(1);
    setConfirmText("");
    setPassword("");
    onClose();
  };

  const handleDelete = async () => {
    if (!password) return toast.error("Password is required");
    setLoading(true);
    try {
      await deleteAccountAPI(password);
      toast.success("Account deleted");
      logout();
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  const whatWillBeDeleted = [
    "All your posts and photos",
    "All your comments and reactions",
    "Your followers and following",
    "Your streak and analytics",
    "Your saved and archived posts",
    "Your profile and account data",
  ];

  return (
    <Modal open={open} onClose={handleClose} title="">
      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5"
          >
            {/* Warning header */}
            <div className="flex flex-col items-center text-center pt-2 pb-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <Trash2 size={28} className="text-red-400" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">
                Delete Account
              </h3>
              <p className="text-gray-400 text-sm">
                This action is permanent and cannot be undone.
              </p>
            </div>

            {/* What gets deleted */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-red-400" />
                <p className="text-red-400 text-sm font-bold">
                  This will permanently delete:
                </p>
              </div>
              <ul className="space-y-2">
                {whatWillBeDeleted.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-gray-400"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Confirm text input */}
            <div>
              <p className="text-sm text-gray-400 mb-2">
                Type{" "}
                <span className="text-white font-mono font-bold">
                  {CONFIRM_TEXT}
                </span>{" "}
                to continue:
              </p>
              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={CONFIRM_TEXT}
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-red-500 transition text-sm"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleClose}
                className="flex-1 py-3 rounded-xl font-bold text-gray-400 border border-gray-700 hover:border-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={confirmText !== CONFIRM_TEXT}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-5"
          >
            {/* Final confirmation */}
            <div className="text-center pt-2 pb-2">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={28} className="text-red-400" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">
                Final Confirmation
              </h3>
              <p className="text-gray-400 text-sm">
                Enter your password to permanently delete your account.
              </p>
            </div>

            {/* Password input */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
                Your Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 pr-12 py-3 text-white placeholder-gray-600 outline-none focus:border-red-500 transition text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 rounded-xl font-bold text-gray-400 border border-gray-700 hover:border-gray-500 transition"
              >
                Back
              </button>
              <button
                onClick={handleDelete}
                disabled={!password || loading}
                className="flex-1 py-3 rounded-xl font-bold text-white bg-red-500 hover:bg-red-600 transition disabled:opacity-40"
              >
                {loading ? "Deleting..." : "Delete Forever"}
              </button>
            </div>

            <p className="text-center text-gray-700 text-xs">
              This cannot be undone. All your data will be gone.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};