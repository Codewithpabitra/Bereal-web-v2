import { Skeleton } from "./Skeleton";

export const ProfileSkeleton = () => (
  <div className="max-w-xl mx-auto px-4 pt-20 pb-10">
    {/* Header */}
    <div className="flex items-center gap-4 mb-6">
      <Skeleton className="w-20 h-20 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-28" />
        <div className="flex gap-4 mt-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-9 w-20 rounded-xl" />
    </div>

    {/* Streak */}
    <Skeleton className="h-20 w-full rounded-2xl mb-6" />

    {/* Tabs */}
    <div className="flex gap-2 mb-4">
      <Skeleton className="h-8 flex-1 rounded-lg" />
      <Skeleton className="h-8 flex-1 rounded-lg" />
      <Skeleton className="h-8 flex-1 rounded-lg" />
      <Skeleton className="h-8 flex-1 rounded-lg" />
    </div>

    {/* Posts */}
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <PostCardSkeletonInline key={i} />
      ))}
    </div>
  </div>
);

const PostCardSkeletonInline = () => (
  <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
    <div className="flex items-center gap-3 px-4 pt-4 pb-3">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-2 w-20" />
      </div>
    </div>
    <Skeleton className="w-full aspect-square rounded-none" />
    <div className="px-4 py-3">
      <div className="flex gap-4">
        <Skeleton className="h-6 w-12 rounded-full" />
        <Skeleton className="h-6 w-12 rounded-full" />
        <Skeleton className="h-6 w-12 rounded-full" />
      </div>
    </div>
  </div>
);