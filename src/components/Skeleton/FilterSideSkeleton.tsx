export default function FilterSideSkeleton() {
  return (
    <div className='flex w-[285px] animate-pulse flex-col gap-6 bg-white'>
      {/* Section Title */}
      <div className='h-6 w-1/2 rounded bg-gray-200' />

      {/* Category Checkboxes */}
      <div className='flex flex-col gap-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='flex items-center gap-3'>
            <div className='h-4 w-4 rounded bg-gray-200' />
            <div className='h-4 w-24 rounded bg-gray-200' />
          </div>
        ))}
      </div>

      {/* Section Title */}
      <div className='h-6 w-1/3 rounded bg-gray-200' />

      {/* Brands Checkboxes */}
      <div className='flex flex-col gap-3'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className='flex items-center gap-3'>
            <div className='h-4 w-4 rounded bg-gray-200' />
            <div className='h-4 w-24 rounded bg-gray-200' />
          </div>
        ))}
      </div>

      {/* Price Slider Placeholder */}
      <div className='flex flex-col gap-2'>
        <div className='h-6 w-16 rounded bg-gray-200' />
        <div className='h-3 w-full rounded bg-gray-200' />
        <div className='h-3 w-full rounded bg-gray-200' />
      </div>

      {/* Clear Button */}
      <div className='h-9 w-full rounded bg-gray-200' />
    </div>
  );
}
