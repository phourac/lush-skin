export const SkeletonViralPay = () => {
  return (
    <div className='animate-pulse space-y-4 pb-12'>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className='flex flex-col justify-between gap-4 rounded-[16px] border border-gray-200 p-8 sm:flex-row sm:items-center'
        >
          <div className='flex items-center gap-4 sm:w-[289px]'>
            <div className='h-[45px] w-[45px] rounded-full bg-gray-200' />
            <div className='h-[20px] w-[120px] rounded-md bg-gray-200' />
          </div>

          <div className='h-[15px] w-[100px] rounded-md bg-gray-200' />
          <div className='h-[20px] w-[120px] rounded-md bg-gray-200' />
        </div>
      ))}
    </div>
  );
};
