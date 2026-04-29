import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { useAuth } from "../context/AuthContext";
import { updateProfileAPI } from "../api/users";
import { getImageUrl } from "../utils/config";
import { Camera, ArrowLeft, UserX } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function EditProfile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const hasChanges =
    name !== user?.name || bio !== user?.bio || avatar !== null;

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setAvatar(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSave = async () => {
  if (!name.trim()) return toast.error("Name cannot be empty");

  setLoading(true);
  try {
    const form = new FormData();
    form.append("name", name.trim());
    form.append("bio", bio.trim());
    if (avatar) form.append("avatar", avatar);

    const { data } = await updateProfileAPI(form);

    // preserve token
    updateUser({
      ...user,
      ...data,
    });

    toast.success("Profile updated!");

    // use fresh id
    navigate(`/profile/${data._id}`);
  } catch {
    toast.error("Failed to update profile");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 pt-20 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center hover:border-gray-600 transition"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          {hasChanges && (
            <button
              onClick={handleSave}
              disabled={loading}
              className="ml-auto text-sm font-bold text-primary hover:text-indigo-400 transition disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div
              className="relative cursor-pointer group"
              onClick={() => inputRef.current?.click()}
            >
              {preview ? (
                <img
                  src={preview}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                />
              ) : (
                <img
                  src={getImageUrl(user?.avatar)}
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-800 group-hover:border-primary transition"
                  onError={(e) => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = "none";
                  }}
                />
              )}
              <div
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center border-2 border-black"
                style={{ backgroundColor: "#6C63FF" }}
              >
                <Camera size={14} className="text-white" />
              </div>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatar}
            />
            <p className="text-gray-500 text-sm mt-2">Tap to change photo</p>
          </div>

          {/* Fields */}
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={50}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-primary transition"
                placeholder="Your name"
              />
            </div>

            {/* Email — read only */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
                Email
              </label>
              <input
                value={user?.email || ""}
                disabled
                className="w-full bg-gray-900/50 border border-gray-800 rounded-xl px-4 py-3 text-gray-600 outline-none cursor-not-allowed"
              />
              <p className="text-xs text-gray-700 mt-1">
                Email cannot be changed
              </p>
            </div>

            {/* Bio */}
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
                Bio
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={150}
                rows={3}
                className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-600 outline-none focus:border-primary transition resize-none"
                placeholder="Tell people about yourself..."
              />
              <p className="text-right text-gray-700 text-xs mt-1">
                {bio.length}/150
              </p>
            </div>
          </div>

          {/* Save button */}
          <button
            onClick={handleSave}
            disabled={!hasChanges || loading}
            className="w-full py-4 rounded-2xl font-bold text-white text-base transition active:scale-95 disabled:opacity-40"
            style={{ backgroundColor: "#6C63FF" }}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {/* Manage Blocked accounts  */}
          <Link
            to="/blocked"
            className="flex items-center justify-between w-full py-4 px-4 bg-gray-900 border border-gray-800 rounded-2xl hover:border-gray-600 transition"
          >
            <div className="flex items-center gap-3">
              <UserX size={18} className="text-gray-400" />
              <div>
                <p className="text-sm font-semibold text-white">
                  Blocked Users
                </p>
                <p className="text-xs text-gray-500">Manage blocked accounts</p>
              </div>
            </div>
            <span className="text-gray-600">›</span>
          </Link>

          {/* Danger zone */}
          <div className="border border-red-900/40 rounded-2xl p-4">
            <p className="text-red-500 text-sm font-semibold mb-1">
              Danger Zone
            </p>
            <p className="text-gray-600 text-xs mb-3">
              These actions cannot be undone
            </p>
            <button className="text-red-500 text-sm hover:text-red-400 transition">
              Delete Account
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
