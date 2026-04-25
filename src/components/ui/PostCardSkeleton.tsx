import { Skeleton } from "./Skeleton";

export const PostCardSkeleton = () => (
  <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
    {/* Header */}
    <div className="flex items-center gap-3 px-4 pt-4 pb-3">
      <Skeleton className="w-10 h-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-2 w-20" />
      </div>
      <Skeleton className="h-3 w-16" />
    </div>

    {/* Image */}
    <Skeleton className="w-full aspect-square rounded-none" />

    {/* Actions */}
    <div className="px-4 py-3 space-y-3">
      <Skeleton className="h-3 w-3/4" />
      <div className="flex items-center gap-4">
        <Skeleton className="h-6 w-12 rounded-full" />
        <Skeleton className="h-6 w-12 rounded-full" />
        <Skeleton className="h-6 w-12 rounded-full" />
        <Skeleton className="h-6 w-12 rounded-full" />
        <Skeleton className="ml-auto h-6 w-6 rounded-full" />
      </div>
    </div>
  </div>
);