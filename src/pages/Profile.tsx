import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Avatar } from "../components/ui/Avatar";
import { Button } from "../components/ui/Button";
import { Spinner } from "../components/ui/Spinner";
import { PostCard } from "../components/post/PostCard";
import { AnalyticsChart } from "../components/profile/AnalyticsChart";
import {
  getProfileAPI,
  followUserAPI,
  getLikedPostsAPI,
  getRepostedPostsAPI,
  getUserPostsAPI, // ← add this
} from "../api/users";
import { getMyAnalyticsAPI } from "../api/analytics";
import { useAuth } from "../context/AuthContext";
import { type User, type Post, type Analytics } from "../types";
import { ImageOff } from "lucide-react";
import toast from "react-hot-toast";

type Tab = "posts" | "liked" | "reposts" | "analytics";

const EmptyTab = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center py-20 text-gray-600">
    <ImageOff size={40} className="mb-3 opacity-40" />
    <p className="text-base">{message}</p>
  </div>
);

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const { user: me } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("posts");
  const [userPosts, setUserPosts] = useState<Post[]>([]); // ← add this
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const [repostedPosts, setRepostedPosts] = useState<Post[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  const isMe = me?._id === id;

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await getProfileAPI(id!);
        setProfile(data);
        setFollowing(
          data.followers.some((f: User) => f._id === me?._id)
        );

        const [posts, liked, reposted] = await Promise.all([
          getUserPostsAPI(id!),   // ← fetch user posts
          getLikedPostsAPI(id!),
          getRepostedPostsAPI(id!),
        ]);

        setUserPosts(posts.data);
        setLikedPosts(liked.data);
        setRepostedPosts(reposted.data);

        if (isMe) {
          const { data: analyticsData } = await getMyAnalyticsAPI();
          setAnalytics(analyticsData);
        }
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleFollow = async () => {
    try {
      await followUserAPI(id!);
      setFollowing((f) => !f);
      toast.success(following ? "Unfollowed" : "Following!");
    } catch {
      toast.error("Failed to follow");
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <div className="pt-20">
          <Spinner />
        </div>
      </>
    );

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "posts", label: "Posts", count: userPosts.length },
    { key: "liked", label: "Liked", count: likedPosts.length },
    { key: "reposts", label: "Reposts", count: repostedPosts.length },
    ...(isMe ? [{ key: "analytics" as Tab, label: "Analytics" }] : []),
  ];

  const getTabContent = () => {
    switch (activeTab) {
      case "posts":
        return userPosts.length === 0 ? (
          <EmptyTab message="No posts yet" />
        ) : (
          userPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLike={() => {}}
              onRepost={() => {}}
              onShare={() => {}}
              onDelete={() => {}}
            />
          ))
        );
      case "liked":
        return likedPosts.length === 0 ? (
          <EmptyTab message="No liked posts yet" />
        ) : (
          likedPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLike={() => {}}
              onRepost={() => {}}
              onShare={() => {}}
              onDelete={() => {}}
            />
          ))
        );
      case "reposts":
        return repostedPosts.length === 0 ? (
          <EmptyTab message="No reposts yet" />
        ) : (
          repostedPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLike={() => {}}
              onRepost={() => {}}
              onShare={() => {}}
              onDelete={() => {}}
            />
          ))
        );
      case "analytics":
        return analytics ? (
          <AnalyticsChart analytics={analytics} />
        ) : (
          <EmptyTab message="No analytics yet" />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 pt-20 pb-10">

        {/* Profile header */}
        <div className="flex items-center gap-4 mb-6">
          <Avatar
            src={profile?.avatar}
            name={profile?.name || ""}
            size="lg"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{profile?.name}</h2>
            <p className="text-gray-400 text-sm">{profile?.email}</p>
            {profile?.bio && (
              <p className="text-gray-300 text-sm mt-1">{profile.bio}</p>
            )}
            <p className="text-gray-500 text-xs mt-1">
              Member since{" "}
              {new Date(profile?.memberSince || "").toLocaleDateString()}
            </p>
            <div className="flex gap-4 mt-2 text-sm">
              <span>
                <strong>{profile?.followers.length}</strong>{" "}
                <span className="text-gray-400">followers</span>
              </span>
              <span>
                <strong>{profile?.following.length}</strong>{" "}
                <span className="text-gray-400">following</span>
              </span>
            </div>
          </div>
          {!isMe && (
            <Button
              variant={following ? "ghost" : "primary"}
              onClick={handleFollow}
            >
              {following ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 mb-4">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`flex-1 py-2 text-sm font-semibold transition flex flex-col items-center gap-0.5 ${
                activeTab === t.key
                  ? "text-white border-b-2 border-[#6C63FF]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {t.label}
              {t.count !== undefined && (
                <span className="text-xs text-gray-600">{t.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="space-y-4">{getTabContent()}</div>
      </div>
    </div>
  );
}