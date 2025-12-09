export const SkeletonStartEarning = () => {
  return (
    <div className='flex animate-pulse flex-col gap-6 pb-8 md:flex-row'>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className='flex-1 space-y-6 rounded-[16px] border border-gray-200 p-8'
        >
          <div className='h-[32px] w-[140px] rounded-md bg-gray-200' />
          <div className='h-[60px] w-full rounded-md bg-gray-200' />
          <div className='absolute top-0 right-0 h-[97px] w-[97px] rounded-md bg-gray-200 opacity-30' />
        </div>
      ))}
    </div>
  );
};
