import { Skeleton } from "./Skeleton";

export const ExploreSkeleton = () => (
  <div className="space-y-6">
    {/* Search results skeleton */}
    <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden divide-y divide-gray-800">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-3">
          <Skeleton className="w-10 h-10 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="h-7 w-16 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);

export const ExploreGridSkeleton = () => (
  <div className="grid grid-cols-3 gap-0.5">
    {Array.from({ length: 12 }).map((_, i) => (
      <Skeleton key={i} className="aspect-square rounded-none" />
    ))}
  </div>
);