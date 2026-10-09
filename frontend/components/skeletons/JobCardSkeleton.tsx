interface JobCardSkeletonProps {
  count?: number;
}

export default function JobCardSkeleton({ count = 4 }: JobCardSkeletonProps) {
  return (
    <div className="flex flex-col gap-4" aria-label="Memuat lowongan pekerjaan...">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200/90 rounded-xl p-5 animate-pulse"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left section: Logo placeholder + Text placeholders */}
            <div className="flex items-start gap-4 flex-1">
              {/* Logo box placeholder */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-200 rounded-md shrink-0" />

              <div className="flex flex-col gap-2.5 flex-1 max-w-lg">
                {/* Job Title placeholder */}
                <div className="h-5 bg-zinc-200 rounded w-3/4 md:w-2/3" />

                {/* Metadata pills placeholders */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <div className="h-3.5 bg-zinc-100 rounded w-24" />
                  <div className="h-3.5 bg-zinc-100 rounded w-16" />
                  <div className="h-3.5 bg-zinc-100 rounded w-20" />
                  <div className="h-3.5 bg-zinc-100 rounded w-16" />
                </div>
              </div>
            </div>

            {/* Right section: Date stamps placeholders */}
            <div className="flex flex-col md:items-end justify-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-zinc-100">
              <div className="h-3 bg-zinc-100 rounded w-28 md:w-32" />
              <div className="h-3 bg-zinc-100 rounded w-24 md:w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
