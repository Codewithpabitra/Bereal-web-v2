import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Splash() {
  const navigate = useNavigate();
  const seen = localStorage.getItem("onboarding_seen");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (seen) {
        navigate("/login");
      } else {
        navigate("/onboarding");
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        {/* Logo */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center"
          style={{ backgroundColor: "#6C63FF" }}
        >
          <span className="text-4xl">📸</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-5xl font-black text-white tracking-tight"
        >
          Candid
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-gray-400 text-lg"
        >
          Be real. Be you.
        </motion.p>
      </motion.div>

      {/* Bottom pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 flex flex-col items-center gap-2"
      >
        <div className="w-6 h-6 rounded-full border-2 border-[#6C63FF] border-t-transparent animate-spin" />
      </motion.div>
    </div>
  );
}