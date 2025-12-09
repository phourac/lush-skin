export const SlideshowBannerSkeleton = () => {
  return (
    <div className='relative aspect-[16/6] w-full animate-pulse overflow-hidden bg-gray-200'>
      {/* Shimmer effect */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='shimmer'></div>
      </div>

      {/* Pagination dots */}
      <div className='absolute bottom-4 left-1/2 hidden -translate-x-1/2 gap-2 sm:flex'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='h-2 w-2 rounded-full bg-gray-300'></div>
        ))}
      </div>
    </div>
  );
};
