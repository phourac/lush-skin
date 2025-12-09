export const SkeletonOrderCard = () => {
  return (
    <div className='border-border animate-pulse rounded-[12px] border'>
      {/* Header */}
      <div className='bg-paper flex justify-between rounded-t-[12px] px-6 py-[18px]'>
        <div className='flex items-center gap-3'>
          <div className='bg-border h-4 w-32 rounded' />
          <div className='bg-border h-4 w-20 rounded' />
        </div>
        <div className='bg-border h-5 w-24 rounded' />
      </div>

      {/* Items */}
      <div className='py-[18px]'>
        {[1, 2].map((i) => (
          <div key={i}>
            <div className='flex justify-between px-6'>
              <div className='flex items-start gap-3'>
                <div className='bg-border h-[72px] w-[72px] rounded-md' />
                <div className='flex flex-col gap-2'>
                  <div className='bg-border h-4 w-40 rounded' />
                  <div className='bg-border h-3 w-28 rounded' />
                  <div className='bg-border h-3 w-16 rounded' />
                </div>
              </div>
              <div className='bg-border h-4 w-12 rounded' />
            </div>

            <hr className='bg-border mx-6 my-6 h-px border-0' />
          </div>
        ))}

        {/* Footer */}
        <div className='flex flex-col items-end gap-3 px-6 md:flex-row md:items-center'>
          <div className='bg-border h-4 w-36 rounded' />
          <span className='hidden md:block'>|</span>
          <div className='bg-border h-4 w-20 rounded' />
        </div>
      </div>
    </div>
  );
};
