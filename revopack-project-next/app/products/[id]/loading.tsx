export default function Loading() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="h-4 bg-slate-200 rounded w-32 mb-6 animate-pulse" />
      <div className="bg-white rounded-2xl border border-slate-200 p-8">
        <div className="h-8 bg-slate-200 rounded w-3/4 mb-4 animate-pulse" />
        <div className="h-10 bg-slate-200 rounded w-1/2 mb-6 animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-full mb-2 animate-pulse" />
        <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse" />
      </div>
    </main>
  );
}