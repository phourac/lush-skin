'use client';

export default function ProductCardSkeleton({ width = 269 }) {
  return (
    <div
      style={{ maxWidth: width }}
      className='flex h-[423px] animate-pulse flex-col gap-3 overflow-hidden rounded-md bg-white p-3'
    >
      {/* Image placeholder with same aspect ratio */}
      <div
        style={{ width: width - 24 }} // Account for padding
        className='relative aspect-[269/287] rounded-md bg-gray-200'
      />

      {/* Title placeholder (always 2-line space) */}
      <div className='min-h-[42px] w-full rounded bg-gray-200' />

      {/* Spacer to push price to bottom */}
      <div className='flex-grow' />

      {/* Price */}
      <div className='flex flex-col items-center gap-2 pb-2'>
        <div className='h-5 w-24 rounded bg-gray-200' />
        <div className='h-4 w-16 rounded bg-gray-200' />
      </div>
    </div>
  );
}
