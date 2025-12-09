'use client';

const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse rounded-md bg-gray-200 ${className}`} />
);

const AccountSkeleton = () => {
  return (
    <div className='flex flex-col gap-8'>
      {/* Profile Image Skeleton */}
      <div className='border-border rounded-[16px] border p-8'>
        {/* Title */}
        <Skeleton className='mb-6 h-6 w-40' />

        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            {/* Avatar */}
            <div className='h-[70px] w-[70px] animate-pulse rounded-full bg-gray-200' />

            {/* Two text lines */}
            <div className='flex flex-col gap-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-4 w-20' />
            </div>
          </div>

          {/* Desktop button */}
          <Skeleton className='hidden h-[48px] w-[146px] lg:block' />
        </div>

        {/* Mobile button */}
        <Skeleton className='mt-6 h-[48px] w-[146px] lg:hidden' />
      </div>

      {/* Personal Info Skeleton */}
      <div className='border-border rounded-[16px] border p-8'>
        {/* Title */}
        <Skeleton className='mb-6 h-6 w-32' />

        <div className='flex flex-col gap-6'>
          {/* Full Name */}
          <Skeleton className='h-[48px] w-full' />

          {/* Gender */}
          <Skeleton className='h-[48px] w-full' />

          {/* Date of Birth */}
          <div className='flex flex-col gap-4 sm:flex-row'>
            <Skeleton className='h-[48px] w-full' />
            <Skeleton className='h-[48px] w-full' />
            <Skeleton className='h-[48px] w-full' />
          </div>
        </div>

        {/* Submit Button */}
        <div className='mt-6 flex justify-end'>
          <Skeleton className='h-[48px] w-[146px]' />
        </div>
      </div>

      {/* Password Skeleton */}
      <div className='border-border rounded-[16px] border p-8'>
        {/* Title */}
        <Skeleton className='mb-6 h-6 w-40' />

        <div className='flex flex-col gap-6'>
          <Skeleton className='h-[48px] w-full' />
          <Skeleton className='h-[48px] w-full' />
          <Skeleton className='h-[48px] w-full' />
        </div>

        {/* Submit Button */}
        <div className='mt-6 flex justify-end'>
          <Skeleton className='h-[48px] w-[146px]' />
        </div>
      </div>
    </div>
  );
};

export default AccountSkeleton;
