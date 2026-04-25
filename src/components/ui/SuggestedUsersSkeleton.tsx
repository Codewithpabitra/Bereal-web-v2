import { Skeleton } from "./Skeleton";

export const SuggestedUsersSkeleton = () => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 mb-6">
    <div className="flex items-center gap-2 mb-4">
      <Skeleton className="w-4 h-4 rounded" />
      <Skeleton className="h-3 w-36" />
    </div>
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-2 w-20" />
          </div>
          <Skeleton className="h-7 w-16 rounded-full" />
        </div>
      ))}
    </div>
  </div>
);