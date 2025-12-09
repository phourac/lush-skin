export default function OrderCardSkeleton() {
  return (
    <div className='w-full animate-pulse rounded-[12px] border border-gray-200'>
      {/* Header Skeleton */}
      <div className='bg-paper flex justify-between rounded-t-[12px] px-6 py-[18px]'>
        <div className='h-[18px] w-[180px] rounded bg-gray-200' />
        <div className='h-[20px] w-[80px] rounded bg-gray-200' />
      </div>

      {/* Items */}
      <div className='w-full py-[18px]'>
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i}>
            <div className='flex justify-between px-6'>
              <div className='flex items-start gap-3'>
                {/* Image */}
                <div className='h-[72px] w-[72px] rounded-md bg-gray-200' />

                <div className='flex max-w-[222px] flex-col gap-2'>
                  <div className='h-[15px] w-[150px] rounded bg-gray-200' />
                  <div className='space-y-2'>
                    <div className='h-[14px] w-[90px] rounded bg-gray-200' />
                    <div className='h-[14px] w-[110px] rounded bg-gray-200' />
                  </div>
                  <div className='h-[14px] w-[40px] rounded bg-gray-200' />
                </div>
              </div>

              <div className='h-[15px] w-[60px] rounded bg-gray-200' />
            </div>

            <hr className='mx-6 my-6 h-px border-0 bg-gray-200' />
          </div>
        ))}

        {/* Footer */}
        <div className='flex flex-col items-end gap-3 px-6 md:flex-row md:items-center md:justify-end'>
          <div className='h-[15px] w-[180px] rounded bg-gray-200' />
          <span className='hidden h-[15px] w-[1px] bg-gray-200 md:block' />
          <div className='h-[15px] w-[90px] rounded bg-gray-200' />
        </div>
      </div>
    </div>
  );
}
