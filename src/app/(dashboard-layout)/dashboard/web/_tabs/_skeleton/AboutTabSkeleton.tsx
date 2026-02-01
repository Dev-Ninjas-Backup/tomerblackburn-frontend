export const AboutTabSkeleton = () => {
  return (
    <div className="w-full mx-auto animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-32 mb-6"></div>
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-10 bg-gray-200 rounded"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="flex justify-end">
          <div className="h-12 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
};
