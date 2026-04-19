import { useState, useEffect } from "react";
import { type Comment } from "../types";
import { getCommentsAPI, addCommentAPI, deleteCommentAPI } from "../api/comments";
import toast from "react-hot-toast";

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getCommentsAPI(postId);
        setComments(data);
      } catch {
        toast.error("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [postId]);

  const addComment = async (text: string) => {
    const { data } = await addCommentAPI(postId, text);
    setComments(prev => [data, ...prev]);
  };

  const deleteComment = async (id: string) => {
    await deleteCommentAPI(id);
    setComments(prev => prev.filter(c => c._id !== id));
  };

  return { comments, loading, addComment, deleteComment };
};