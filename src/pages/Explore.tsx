import { useState, useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Spinner } from "../components/ui/Spinner";
import { UserCard } from "../components/search/UserCard";
import { ExploreGrid } from "../components/explore/ExploreGrid";
import { useSearch } from "../hooks/useSearch";
import { getExploreAPI } from "../api/posts";
import { type Post } from "../types";
import { Search, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function Explore() {
  const { query, setQuery, results, loading: searchLoading } = useSearch();
  const [explorePosts, setExplorePosts] = useState<Post[]>([]);
  const [exploreLoading, setExploreLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getExploreAPI();
        setExplorePosts(data);
      } catch {
        toast.error("Failed to load explore");
      } finally {
        setExploreLoading(false);
      }
    };
    fetch();
  }, []);

  const isSearching = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 pt-20 pb-10">

        {/* Search bar */}
        <div className="relative mb-6">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search people..."
            className="w-full bg-gray-900 border border-gray-800 rounded-2xl pl-11 pr-4 py-3 text-white placeholder-gray-500 outline-none focus:border-primary transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition text-xl leading-none"
            >
              ×
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {/* Search results */}
          {isSearching ? (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {searchLoading ? (
                <Spinner />
              ) : results.length === 0 ? (
                <div className="text-center text-gray-500 py-20">
                  <p className="text-lg">No users found</p>
                  <p className="text-sm mt-1">Try a different name</p>
                </div>
              ) : (
                <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden divide-y divide-gray-800">
                  {results.map((user) => (
                    <UserCard key={user._id} user={user} />
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            /* Explore grid */
            <motion.div
              key="explore"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Compass size={18} className="text-primary" />
                <h2 className="font-bold text-white">Explore</h2>
                <span className="text-gray-500 text-sm ml-auto">
                  {explorePosts.length} posts
                </span>
              </div>

              {exploreLoading ? (
                <Spinner />
              ) : explorePosts.length === 0 ? (
                <div className="text-center text-gray-500 py-20">
                  <p className="text-lg">No posts yet</p>
                  <p className="text-sm mt-1">Be the first to post!</p>
                </div>
              ) : (
                <ExploreGrid posts={explorePosts} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}