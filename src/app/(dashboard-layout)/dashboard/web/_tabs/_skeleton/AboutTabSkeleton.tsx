export const AboutTabSkeleton = () => {
  return (
    <div className="flex flex-col h-full animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="space-y-1.5">
          <div className="h-4 bg-gray-200 rounded w-20" />
          <div className="h-3 bg-gray-200 rounded w-44" />
        </div>
        <div className="h-9 bg-gray-200 rounded-lg w-20" />
      </div>

      {/* Two column */}
      <div className="flex flex-col md:flex-row gap-5 flex-1 min-h-0">
        {/* Left */}
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <div className="h-3 bg-gray-200 rounded w-10 mb-1.5" />
            <div className="h-9 bg-gray-200 rounded-lg" />
          </div>
          <div>
            <div className="h-3 bg-gray-200 rounded w-28 mb-1.5" />
            <div className="h-9 bg-gray-200 rounded-lg" />
          </div>
          <div className="flex-1">
            <div className="h-3 bg-gray-200 rounded w-20 mb-1.5" />
            <div className="h-full min-h-[180px] bg-gray-200 rounded-lg" />
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-72 shrink-0 flex flex-col gap-2">
          <div className="h-3 bg-gray-200 rounded w-28" />
          <div className="flex-1 min-h-[200px] bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
