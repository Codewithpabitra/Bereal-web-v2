export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  followers: User[];
  following: User[];
  likedPosts: string[];
  repostedPosts: string[];
  sharedPosts: string[];
  memberSince: string;
  currentStreak: number;
  longestStreak: number;
  lastPostedDate: string;
  token?: string;
}

export interface Post {
  _id: string;
  user: User;
  image: string;
  caption: string;
  likes: string[];
  reposts: string[];
  shareCount: number;
  isRepost: boolean;
  originalPost?: Post;
  expiresAt: string;
  createdAt: string;
}

export interface Comment {
  _id: string;
  post: string;
  user: User;
  text: string;
  createdAt: string;
}

export interface Analytics {
  memberSince: string;
  totalPosts: number;
  totalLikes: number;
  totalReposts: number;
  totalShares: number;
  dailyPosts: { date: string; count: number }[];
  monthlyPosts: { month: string; count: number }[];
  yearlyPosts: { year: string; count: number }[];
}
export interface Notification {
  _id: string;
  recipient: string;
  sender: User;
  type: "like" | "comment" | "follow" | "repost";
  post?: { _id: string; image: string };
  read: boolean;
  message: string;
  createdAt: string;
}

export interface Reaction {
  _id: string;
  post: string;
  user: User;
  emoji: string;
}

export interface ReactionGroup {
  grouped: Record<string, User[]>;
  total: number;
}

export interface LeaderboardEntry {
  rank: number;
  post: Post;
  user: User;
  likeCount: number;
}

export interface Leaderboard {
  leaderboard: LeaderboardEntry[];
  weekStart: string;
  weekEnd: string;
  totalPosts: number;
}

export interface Memory {
  yearsAgo: number;
  date: string;
  posts: Post[];
}
