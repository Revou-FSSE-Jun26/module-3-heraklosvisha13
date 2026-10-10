export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <div className="h-10 bg-slate-200 rounded w-48 mb-3 animate-pulse" />
      <div className="h-4 bg-slate-200 rounded w-64 mb-8 animate-pulse" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-slate-200 p-6 h-24 animate-pulse"
          />
        ))}
      </div>
    </main>
  );
}