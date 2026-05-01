import { useState } from "react";
import { Modal } from "../ui/Modal";
import { changePasswordAPI } from "../../api/auth";
import { Eye, EyeOff, Lock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

// ✅ Moved OUTSIDE the modal component — fixes the refocus bug
interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  placeholder: string;
}

const PasswordInput = ({
  label,
  value,
  onChange,
  show,
  onToggle,
  placeholder,
}: PasswordInputProps) => (
  <div>
    <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
      {label}
    </label>
    <div className="relative">
      <Lock
        size={15}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
      />
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-gray-800 border border-gray-700 rounded-xl pl-10 pr-12 py-3 text-white placeholder-gray-600 outline-none focus:border-primary transition text-sm"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
      >
        {show ? <EyeOff size={15} /> : <Eye size={15} />}
      </button>
    </div>
  </div>
);

interface Props {
  open: boolean;
  onClose: () => void;
}


export const ChangePasswordModal = ({ open, onClose }: Props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const passwordStrength = (pwd: string) => {
    if (pwd.length === 0) return null;
    if (pwd.length < 6) return { label: "Too short", color: "text-red-400", width: "w-1/4" };
    if (pwd.length < 8) return { label: "Weak", color: "text-orange-400", width: "w-2/4" };
    if (!/[A-Z]/.test(pwd) || !/[0-9]/.test(pwd)) return { label: "Medium", color: "text-yellow-400", width: "w-3/4" };
    return { label: "Strong", color: "text-green-400", width: "w-full" };
  };

  const strength = passwordStrength(newPassword);

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("New passwords don't match");
    }
    if (newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }
    setLoading(true);
    try {
      await changePasswordAPI({ currentPassword, newPassword });
      setSuccess(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSuccess(false);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={success ? "" : "Change Password"}
    >
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Password Changed!
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              Your password has been updated successfully.
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
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <PasswordInput
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
              show={showCurrent}
              onToggle={() => setShowCurrent((p) => !p)}
              placeholder="Enter current password"
            />

            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              show={showNew}
              onToggle={() => setShowNew((p) => !p)}
              placeholder="Enter new password"
            />

            {/* Password strength */}
            {strength && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-1"
              >
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      strength.label === "Strong"
                        ? "bg-green-400"
                        : strength.label === "Medium"
                        ? "bg-yellow-400"
                        : strength.label === "Weak"
                        ? "bg-orange-400"
                        : "bg-red-400"
                    } ${strength.width}`}
                  />
                </div>
                <p className={`text-xs ${strength.color}`}>{strength.label}</p>
              </motion.div>
            )}

            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirm}
              onToggle={() => setShowConfirm((p) => !p)}
              placeholder="Confirm new password"
            />

            {/* Match indicator */}
            {confirmPassword && (
              <p
                className={`text-xs ${
                  newPassword === confirmPassword
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {newPassword === confirmPassword
                  ? "✓ Passwords match"
                  : "✗ Passwords don't match"}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={
                loading ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
              className="w-full py-3 rounded-xl font-bold text-white transition disabled:opacity-40 mt-2"
              style={{ backgroundColor: "#6C63FF" }}
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};