import { motion } from "framer-motion";

interface SlideProps {
  emoji: string;
  title: string;
  description: string;
  gradient: string;
}

export const OnboardingSlide = ({ emoji, title, description, gradient }: SlideProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center text-center px-8 h-full"
    >
      {/* Illustration circle */}
      <div
        className="w-48 h-48 rounded-full flex items-center justify-center mb-10 text-8xl"
        style={{ background: gradient }}
      >
        {emoji}
      </div>

      <h2 className="text-3xl font-black text-white mb-4 leading-tight">
        {title}
      </h2>
      <p className="text-gray-400 text-lg leading-relaxed max-w-xs">
        {description}
      </p>
    </motion.div>
  );
};