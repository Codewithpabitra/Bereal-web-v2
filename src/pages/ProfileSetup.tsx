import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { updateProfileAPI } from "../api/users";
import { Camera } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfileSetup() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatar(f);
    setPreview(URL.createObjectURL(f));
  };

 const handleSubmit = async () => {
  setLoading(true);
  try {
    const form = new FormData();
    form.append("bio", bio);
    form.append("name", user?.name || "");
    if (avatar) form.append("avatar", avatar);

    const { data } = await updateProfileAPI(form);

    // preserve token
    updateUser({
      ...user,
      ...data,
    });

    toast.success("Profile set up! Welcome to Candid 🎉");
    navigate("/feed");
  } catch {
    toast.error("Failed to save profile");
  } finally {
    setLoading(false);
  }
};

  const handleSkip = () => navigate("/feed");

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white mb-2">
            Set up your profile
          </h1>
          <p className="text-gray-400">
            Let people know who you are, {user?.name?.split(" ")[0]}!
          </p>
        </div>

        {/* Avatar picker */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="relative cursor-pointer"
            onClick={() => inputRef.current?.click()}
          >
            {preview ? (
              <img
                src={preview}
                className="w-28 h-28 rounded-full object-cover border-4 border-primary"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center">
                <span className="text-4xl font-black text-primary">
                  {user?.name?.[0]?.toUpperCase()}
                </span>
              </div>
            )}

            {/* Camera overlay */}
            <div className="absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center border-2 border-black"
              style={{ backgroundColor: "#6C63FF" }}
            >
              <Camera size={16} className="text-white" />
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatar}
          />
          <p className="text-gray-500 text-sm mt-3">Tap to add a photo</p>
        </div>

        {/* Bio input */}
        <div className="mb-8">
          <label className="text-sm text-gray-400 uppercase tracking-wide mb-2 block">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Tell people a little about yourself..."
            rows={3}
            maxLength={150}
            className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none resize-none focus:border-primary transition"
          />
          <p className="text-right text-gray-600 text-xs mt-1">
            {bio.length}/150
          </p>
        </div>

        {/* Buttons */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-4 rounded-2xl font-bold text-white text-lg mb-3 transition active:scale-95 disabled:opacity-50"
          style={{ backgroundColor: "#6C63FF" }}
        >
          {loading ? "Saving..." : "Complete Setup"}
        </button>

        <button
          onClick={handleSkip}
          className="w-full py-3 text-gray-500 text-sm hover:text-gray-300 transition"
        >
          Skip for now
        </button>
      </motion.div>
    </div>
  );
}