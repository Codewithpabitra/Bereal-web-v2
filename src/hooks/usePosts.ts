import { useState, useEffect } from "react";
import { type Post } from "../types";
import { getFeedAPI, likePostAPI, repostPostAPI, sharePostAPI, deletePostAPI } from "../api/posts";
import toast from "react-hot-toast";

// socket -> live feed whenever any user post
// import { useSocket } from "../context/SocketContext";

export const usePosts = () => {
  // const { socket } = useSocket();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFeed = async () => {
    try {
      const { data } = await getFeedAPI();
      setPosts(data);
    } catch (err) {
      console.error("Feed error:", err);
      toast.error("Failed to load feed");
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => { fetchFeed(); }, []);

  // ✅ Real-time new post listener
  // useEffect(() => {
  //   if (!socket) return;

  //   socket.on("post:new", (post: Post) => {
  //     setPosts((prev) => {
  //       // Don't add duplicates
  //       if (prev.find((p) => p._id === post._id)) return prev;
  //       return [post, ...prev];
  //     });
  //   });

  //   return () => {
  //     socket.off("post:new");
  //   };
  // }, [socket]);

  const likePost = async (id: string) => {
    const { data } = await likePostAPI(id);
    setPosts(prev => prev.map(p =>
      p._id === id
        ? { ...p, likes: data.liked ? [...p.likes, "me"] : p.likes.slice(0, -1) }
        : p
    ));
  };

  const repostPost = async (id: string) => {
    await repostPostAPI(id);
    fetchFeed();
  };

  const sharePost = async (id: string) => {
    const { data } = await sharePostAPI(id);
    setPosts(prev => prev.map(p =>
      p._id === id ? { ...p, shareCount: data.shareCount } : p
    ));
  };

  const deletePost = async (id: string) => {
    await deletePostAPI(id);
    setPosts(prev => prev.filter(p => p._id !== id));
  };

  return { posts, loading, fetchFeed, likePost, repostPost, sharePost, deletePost };
};