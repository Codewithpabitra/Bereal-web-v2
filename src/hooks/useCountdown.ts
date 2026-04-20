import { useState, useEffect } from "react";

export const useCountdown = (expiresAt: string) => {
  const getTimeLeft = () => {
    const diff = new Date(expiresAt).getTime() - Date.now();
    if (diff <= 0) return null;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours, minutes, seconds, diff };
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      const t = getTimeLeft();
      setTimeLeft(t);
      if (!t) clearInterval(interval); // stop when expired
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return timeLeft;
};