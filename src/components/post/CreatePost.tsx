import { useState, useRef } from "react";
import { createPostAPI } from "../../api/posts";
import { Button } from "../ui/Button";
import { ImagePlus, X } from "lucide-react";
import toast from "react-hot-toast";

export const CreatePost = ({ onCreated }: { onCreated: () => void }) => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleSubmit = async () => {
    if (!file) return toast.error("Please select an image");
    setLoading(true);
    try {
      const form = new FormData();
      form.append("image", file);
      form.append("caption", caption);
      await createPostAPI(form);
      toast.success("Posted! 🎉");
      setFile(null);
      setPreview(null);
      setCaption("");
      onCreated();
    } catch {
      toast.error("Failed to post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-2xl p-4 border border-gray-800 mb-6">
      <p className="text-sm text-gray-400 mb-3 font-semibold uppercase tracking-wide">Create a post</p>

      {preview ? (
        <div className="relative mb-3">
          <img src={preview} className="w-full rounded-xl object-cover max-h-72" />
          <button
            onClick={() => { setFile(null); setPreview(null); }}
            className="absolute top-2 right-2 bg-black/60 rounded-full p-1 text-white hover:bg-black"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-700 rounded-xl h-40 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition mb-3"
        >
          <ImagePlus size={32} className="text-gray-500 mb-2" />
          <p className="text-gray-500 text-sm">Click to upload photo</p>
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

      <textarea
        value={caption}
        onChange={e => setCaption(e.target.value)}
        placeholder="Add a caption... (optional)"
        rows={2}
        className="w-full bg-gray-800 rounded-xl px-4 py-2 text-sm text-white placeholder-gray-500 outline-none resize-none mb-3"
      />

      <Button onClick={handleSubmit} loading={loading} className="w-full">
        Post
      </Button>
    </div>
  );
};