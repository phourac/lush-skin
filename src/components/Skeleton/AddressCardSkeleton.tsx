export default function AddressCardSkeleton() {
  return (
    <div className='border-border relative flex w-full items-start gap-4 rounded-[16px] border-[2px] p-4'>
      {/* Checkbox / icon placeholder */}
      <div className='h-4 w-4 animate-pulse rounded-full bg-gray-200' />

      {/* Text placeholders */}
      <div className='flex flex-1 flex-col gap-2'>
        <div className='h-4 w-1/3 animate-pulse rounded bg-gray-200' />
        <div className='h-3 w-1/4 animate-pulse rounded bg-gray-200' />
      </div>

      {/* Actions placeholder */}
      <div className='flex items-center gap-4'>
        <div className='h-4 w-10 animate-pulse rounded bg-gray-200' />
        <div className='h-4 w-10 animate-pulse rounded bg-gray-200' />
      </div>
    </div>
  );
}
