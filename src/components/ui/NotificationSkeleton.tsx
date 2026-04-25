import { Skeleton } from "./Skeleton";

export const NotificationSkeleton = () => (
  <div className="divide-y divide-gray-800">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center gap-3 px-4 py-3">
        <Skeleton className="w-10 h-10 rounded-full shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-2 w-24" />
        </div>
        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
      </div>
    ))}
  </div>
);