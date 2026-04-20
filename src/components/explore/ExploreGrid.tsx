import { useState } from "react";
import { type Post } from "../../types";
import { Heart } from "lucide-react";
import { ExplorePostModal } from "./ExplorePostModal";

import { getImageUrl } from "../../utils/config";

export const ExploreGrid = ({ posts }: { posts: Post[] }) => {
  const [selected, setSelected] = useState<Post | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 gap-0.5">
        {posts.map((post) => (
          <button
            key={post._id}
            onClick={() => setSelected(post)}
            className="relative aspect-square overflow-hidden group"
          >
            <img
  src={getImageUrl(post.image)}
  alt=""
  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
/>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex items-center gap-1 text-white font-bold text-sm">
                <Heart size={16} fill="white" />
                {post.likes.length}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Modal when post clicked */}
      {selected && (
        <ExplorePostModal
          post={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
};