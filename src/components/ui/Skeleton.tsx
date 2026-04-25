import { motion } from "framer-motion";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <motion.div
    animate={{ opacity: [0.4, 0.8, 0.4] }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
    className={`bg-gray-800 rounded-lg ${className}`}
  />
);