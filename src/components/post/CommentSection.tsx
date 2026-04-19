import { useState } from "react";
import { useComments } from "../../hooks/useComments";
import { useAuth } from "../../context/AuthContext";
import { Avatar } from "../ui/Avatar";
import { Trash2 } from "lucide-react";

export const CommentSection = ({ postId }: { postId: string }) => {
  const { user } = useAuth();
  const { comments, loading, addComment, deleteComment } = useComments(postId);
  const [text, setText] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addComment(text);
    setText("");
  };

  return (
    <div className="mt-3 border-t border-gray-800 pt-3">
      <form onSubmit={handleSubmit} className="flex gap-2 mb-3">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-gray-800 rounded-full px-4 py-2 text-sm text-white placeholder-gray-500 outline-none"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="text-primary font-semibold text-sm disabled:opacity-40"
        >
          Post
        </button>
      </form>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading comments...</p>
      ) : (
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {comments.map(c => (
            <div key={c._id} className="flex items-start gap-2">
              <Avatar src={c.user.avatar} name={c.user.name} size="sm" />
              <div className="flex-1 bg-gray-800 rounded-xl px-3 py-2">
                <span className="font-semibold text-sm">{c.user.name} </span>
                <span className="text-sm text-gray-300">{c.text}</span>
              </div>
              {user?._id === c.user._id && (
                <button onClick={() => deleteComment(c._id)} className="text-gray-500 hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};