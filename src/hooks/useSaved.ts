import { useState, useEffect } from "react";
import { type Post } from "../types";
import { getSavedAPI, toggleSaveAPI } from "../api/saved";
import toast from "react-hot-toast";

export const useSaved = () => {
  const [saved, setSaved] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getSavedAPI();
        setSaved(data);
      } catch {
        toast.error("Failed to load saved posts");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const toggleSave = async (postId: string) => {
    const { data } = await toggleSaveAPI(postId);
    if (!data.saved) setSaved(prev => prev.filter(p => p._id !== postId));
    return data.saved;
  };

  return { saved, loading, toggleSave };
};