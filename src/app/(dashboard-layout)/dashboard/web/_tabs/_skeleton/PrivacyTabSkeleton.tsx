export const PrivacyTabSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto animate-pulse">
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl p-8 mb-8">
        <div className="h-8 bg-white/20 rounded w-48 mb-2"></div>
        <div className="h-4 bg-white/20 rounded w-64"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 border">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-32"></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border p-6 space-y-6">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="flex justify-end">
          <div className="h-12 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
};
