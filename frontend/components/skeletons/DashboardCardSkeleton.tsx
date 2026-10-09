interface DashboardCardSkeletonProps {
  count?: number;
}

export default function DashboardCardSkeleton({ count = 3 }: DashboardCardSkeletonProps) {
  return (
    <div className="flex flex-col gap-4" aria-label="Memuat lowongan dashboard...">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200/90 rounded-xl p-5 animate-pulse"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              {/* Logo box */}
              <div className="w-14 h-14 bg-zinc-200 rounded-lg shrink-0" />

              <div className="flex flex-col gap-2.5 flex-1">
                {/* Title */}
                <div className="h-5 bg-zinc-200 rounded w-52 md:w-64" />

                {/* Dates */}
                <div className="flex flex-wrap items-center gap-5 pt-0.5">
                  <div className="h-3.5 bg-zinc-100 rounded w-36" />
                  <div className="h-3.5 bg-zinc-100 rounded w-36" />
                </div>

                {/* Action buttons placeholder */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-7 w-16 bg-zinc-100 rounded-md" />
                  <div className="h-7 w-16 bg-zinc-100 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
