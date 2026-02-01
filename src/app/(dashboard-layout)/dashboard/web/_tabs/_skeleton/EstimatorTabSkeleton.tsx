export const EstimatorTabSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto animate-pulse">
      <div className="flex items-center justify-between mb-8">
        <div className="h-8 bg-gray-200 rounded w-48"></div>
        <div className="h-10 bg-gray-200 rounded w-40"></div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="space-y-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="h-6 bg-gray-200 rounded w-32"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
