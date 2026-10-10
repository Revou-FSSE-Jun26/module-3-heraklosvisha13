"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="max-w-6xl mx-auto px-4 py-12 text-center">
      <h1 className="text-3xl font-extrabold text-red-600 mb-4">
        Something went wrong
      </h1>
      <p className="text-slate-600 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="bg-indigo-600 text-white px-6 py-2 rounded-lg
                   hover:bg-indigo-700 transition"
      >
        Try again
      </button>
    </main>
  );
}