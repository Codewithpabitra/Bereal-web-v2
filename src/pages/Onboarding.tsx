import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { OnboardingSlide } from "../components/onboarding/OnboardingSlide";
import { motion } from "framer-motion";

const slides = [
  {
    emoji: "📸",
    title: "Welcome to Candid",
    description: "The place where real moments matter. No filters, no fakeness.",
    gradient: "linear-gradient(135deg, #6C63FF22, #6C63FF44)",
  },
  {
    emoji: "⏱️",
    title: "Posts Vanish in 24hrs",
    description: "Every post disappears after a day. Stay present, stay real.",
    gradient: "linear-gradient(135deg, #FF636322, #FF636344)",
  },
  {
    emoji: "🤝",
    title: "Find Your People",
    description: "Follow friends, like moments, and build your real community.",
    gradient: "linear-gradient(135deg, #63FFB522, #63FFB544)",
  },
  {
    emoji: "✨",
    title: "Your Moment Awaits",
    description: "Ready to share your first candid moment with the world?",
    gradient: "linear-gradient(135deg, #FFD76322, #FFD76344)",
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const isLast = current === slides.length - 1;

  const handleNext = () => {
    if (isLast) {
      localStorage.setItem("onboarding_seen", "true");
      navigate("/register");
    } else {
      setCurrent(c => c + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboarding_seen", "true");
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">

      {/* Skip button */}
      <div className="flex justify-end p-6">
        {!isLast && (
          <button
            onClick={handleSkip}
            className="text-gray-500 text-sm hover:text-gray-300 transition"
          >
            Skip
          </button>
        )}
      </div>

      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <OnboardingSlide key={current} {...slides[current]} />
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mb-8">
        {slides.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrent(i)}
            animate={{
              width: i === current ? 24 : 8,
              backgroundColor: i === current ? "#6C63FF" : "#374151",
            }}
            transition={{ duration: 0.3 }}
            className="h-2 rounded-full"
          />
        ))}
      </div>

      {/* Bottom buttons */}
      <div className="px-8 pb-12 flex flex-col gap-3">
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl font-bold text-white text-lg transition active:scale-95"
          style={{ backgroundColor: "#6C63FF" }}
        >
          {isLast ? "Get Started 🚀" : "Next"}
        </button>

        {current > 0 && (
          <button
            onClick={() => setCurrent(c => c - 1)}
            className="w-full py-4 rounded-2xl font-bold text-gray-400 text-lg border border-gray-800 hover:border-gray-600 transition"
          >
            Back
          </button>
        )}

        {isLast && (
          <button
            onClick={() => {
              localStorage.setItem("onboarding_seen", "true");
              navigate("/login");
            }}
            className="text-center text-gray-500 text-sm hover:text-gray-300 transition py-2"
          >
            Already have an account? Sign in
          </button>
        )}
      </div>
    </div>
  );
}