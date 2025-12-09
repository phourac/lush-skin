import { PricePreCheckoutSkeleton } from '@/components/Skeleton/PricePreCheckoutSkeleton';

export const CheckoutSummaryItemSkeleton = () => {
  return (
    <div className='w-full animate-pulse space-y-6'>
      {/* Items List Skeleton */}
      <div className='flex flex-col items-start overflow-auto lg:max-h-[260px]'>
        {[1, 2].map((i) => (
          <div key={i} className='w-full'>
            <div className='flex w-full justify-between'>
              {/* Image */}
              <div className='flex w-full items-start gap-3'>
                <div className='h-[72px] w-[72px] rounded-md bg-gray-200' />

                {/* Text */}
                <div className='flex max-w-[222px] flex-col gap-2'>
                  <div className='h-4 w-32 rounded bg-gray-200' />
                  <div className='space-y-1'>
                    <div className='h-3 w-20 rounded bg-gray-200' />
                    <div className='h-3 w-16 rounded bg-gray-200' />
                  </div>
                  <div className='h-3 w-10 rounded bg-gray-200' />
                </div>
              </div>

              <div className='h-4 w-12 rounded bg-gray-200' />
            </div>

            <hr className='bg-border my-6 h-px border-0' />
          </div>
        ))}
      </div>

      <PricePreCheckoutSkeleton />
    </div>
  );
};

export default CheckoutSummaryItemSkeleton;
