export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="h-10 bg-slate-200 rounded w-48 mb-6 animate-pulse" />
      <div className="h-12 bg-slate-200 rounded mb-6 animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse"
          >
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-3" />
            <div className="h-6 bg-slate-200 rounded w-1/2 mb-3" />
            <div className="h-8 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}