export const PaymentMethodSkeleton = () => {
  return (
    <div>
      {[1, 2].map((i) => (
        <div key={i} className='animate-pulse'>
          <div className='flex items-center justify-between py-3'>
            <div className='flex items-center gap-3'>
              <div className='h-[44px] w-[44px] rounded-lg bg-gray-200' />

              <div className='space-y-2'>
                <div className='h-[18px] w-[140px] rounded bg-gray-200' />
                <div className='h-[15px] w-[180px] rounded bg-gray-200' />
              </div>
            </div>

            <div className='h-[24px] w-[24px] rounded bg-gray-200' />
          </div>

          {i < 3 && <hr className='bg-border my-4 h-px border-0' />}
        </div>
      ))}
    </div>
  );
};
