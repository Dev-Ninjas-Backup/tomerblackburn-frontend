export const PortfolioTabSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto animate-pulse">
      <div className="bg-linear-to-r from-purple-600 to-indigo-600 rounded-xl p-8 mb-8">
        <div className="h-8 bg-white/20 rounded w-48 mb-2"></div>
        <div className="h-4 bg-white/20 rounded w-64"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl p-6 border">
            <div className="h-12 w-12 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl border p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-gray-200 rounded w-40"></div>
              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
