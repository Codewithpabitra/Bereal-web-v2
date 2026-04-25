import { useState, useEffect } from "react";
import { getReactionsAPI, toggleReactionAPI } from "../api/reactions";
import { useAuth } from "../context/AuthContext";

const EMOJIS = ["❤️", "😂", "🔥", "😮", "😢", "👏"];

export const useReactions = (postId: string) => {
  const { user } = useAuth();
  const [grouped, setGrouped] = useState<Record<string, any[]>>({});
  const [total, setTotal] = useState(0);
  const [myReaction, setMyReaction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchReactions = async () => {
    try {
      const { data } = await getReactionsAPI(postId);
      setGrouped(data.grouped);
      setTotal(data.total);

      // Find current user's reaction
      const mine = Object.entries(data.grouped).find(([, users]: any) =>
        users.some((u: any) => u._id === user?._id)
      );
      setMyReaction(mine ? mine[0] : null);
    } catch {}
  };

  useEffect(() => {
    fetchReactions();
  }, [postId]);

  const react = async (emoji: string) => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await toggleReactionAPI(postId, emoji);

      if (data.action === "removed") {
        setMyReaction(null);
        setGrouped((prev) => {
          const updated = { ...prev };
          updated[emoji] = updated[emoji]?.filter(
            (u) => u._id !== user?._id
          );
          if (!updated[emoji]?.length) delete updated[emoji];
          return updated;
        });
        setTotal((t) => t - 1);
      } else if (data.action === "updated") {
        setMyReaction(emoji);
        await fetchReactions(); // refetch for simplicity
      } else {
        setMyReaction(emoji);
        setGrouped((prev) => ({
          ...prev,
          [emoji]: [...(prev[emoji] || []), { _id: user?._id, name: user?.name }],
        }));
        setTotal((t) => t + 1);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return { grouped, total, myReaction, react, EMOJIS };
};