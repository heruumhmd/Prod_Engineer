export default function FormSkeleton() {
  return (
    <div className="flex-1 max-w-2xl w-full mx-auto px-4 py-10 animate-pulse" aria-label="Memuat data form...">
      <div className="mb-8">
        <div className="h-8 bg-zinc-200 rounded w-64 mb-2" />
        <div className="h-4 bg-zinc-100 rounded w-80" />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-zinc-200 rounded w-36" />
          <div className="h-10 bg-zinc-100 rounded-lg w-full" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-4 bg-zinc-200 rounded w-24" />
          <div className="h-10 bg-zinc-100 rounded-lg w-full" />
        </div>

        <div className="flex flex-col gap-2">
          <div className="h-4 bg-zinc-200 rounded w-32" />
          <div className="h-24 bg-zinc-100 rounded-lg w-full" />
        </div>

        <div className="flex items-center gap-3 pt-6 border-t border-zinc-200">
          <div className="h-10 w-32 bg-zinc-200 rounded-lg" />
          <div className="h-10 w-24 bg-zinc-100 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
