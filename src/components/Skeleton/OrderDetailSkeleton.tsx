export const OrderDetailSkeleton = () => {
  return (
    <div className='flex animate-pulse flex-col gap-10'>
      {/* Header */}
      <div className='space-y-4 pt-8'>
        <div className='h-8 w-48 rounded bg-gray-200' />
        <div className='h-4 w-72 rounded bg-gray-200' />
      </div>

      <div className='flex flex-col justify-between gap-16 md:flex-row'>
        {/* LEFT SECTION */}
        <div className='w-full space-y-6 md:max-w-[699px]'>
          {/* Status Skeleton */}
          <div className='h-32 w-full rounded-md bg-gray-200' />

          {/* Summary Skeleton */}
          <div className='h-60 w-full rounded-md bg-gray-200' />
        </div>

        {/* RIGHT SECTION */}
        <div className='w-full space-y-6 md:max-w-[388px]'>
          {/* Reorder Skeleton */}
          <div className='h-16 w-full rounded-md bg-gray-200' />

          {/* Note Skeleton */}
          <div className='h-24 w-full rounded-md bg-gray-200' />

          {/* Map Skeleton */}
          <div className='h-[300px] w-full rounded-md bg-gray-200' />

          {/* Customer Info Skeleton */}
          <div className='h-40 w-full rounded-md bg-gray-200' />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailSkeleton;
