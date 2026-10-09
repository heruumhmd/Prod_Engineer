export default function VacancyDetailSkeleton() {
  return (
    <div className="flex-1 max-w-4xl w-full mx-auto px-4 py-10 animate-pulse" aria-label="Memuat detail lowongan...">
      {/* Header section placeholder */}
      <div className="flex items-start gap-5 pb-8 border-b border-zinc-200">
        {/* Logo box */}
        <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-200 rounded-lg shrink-0" />

        <div className="flex flex-col gap-2.5 flex-1">
          {/* Title */}
          <div className="h-7 md:h-9 bg-zinc-200 rounded w-3/4 max-w-md" />

          {/* Sector */}
          <div className="h-4 bg-zinc-100 rounded w-44" />

          {/* Metadata items */}
          <div className="flex flex-wrap items-center gap-4 mt-1">
            <div className="h-4 bg-zinc-100 rounded w-32" />
            <div className="h-4 bg-zinc-100 rounded w-28" />
            <div className="h-4 bg-zinc-100 rounded w-36" />
          </div>
        </div>
      </div>

      {/* Employment type badge */}
      <div className="py-6">
        <div className="h-7 w-24 bg-blue-100/60 rounded-full" />
      </div>

      {/* Job Description paragraphs placeholder */}
      <div className="flex flex-col gap-3 pb-10 border-b border-zinc-200">
        <div className="h-5 bg-zinc-200 rounded w-48 mb-2" />
        <div className="h-4 bg-zinc-100 rounded w-full" />
        <div className="h-4 bg-zinc-100 rounded w-11/12" />
        <div className="h-4 bg-zinc-100 rounded w-4/5" />

        <div className="h-5 bg-zinc-200 rounded w-40 mt-4 mb-2" />
        <div className="h-4 bg-zinc-100 rounded w-5/6" />
        <div className="h-4 bg-zinc-100 rounded w-3/4" />
      </div>

      {/* Informasi Tambahan section */}
      <div className="py-8">
        <div className="h-6 bg-zinc-200 rounded w-44 mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <div className="h-4 bg-zinc-100 rounded w-28" />
            <div className="h-5 bg-zinc-200 rounded w-24" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-4 bg-zinc-100 rounded w-36" />
            <div className="h-5 bg-zinc-200 rounded w-20" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-4 bg-zinc-100 rounded w-24" />
            <div className="h-5 bg-zinc-200 rounded w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
