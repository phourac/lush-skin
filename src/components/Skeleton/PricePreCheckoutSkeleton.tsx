export const PricePreCheckoutSkeleton = () => {
  return (
    <div className='w-full animate-pulse space-y-2'>
      {/* Subtotal */}
      <div className='flex items-center justify-between'>
        <div className='h-[15px] w-[80px] rounded bg-gray-200' />
        <div className='h-[15px] w-[70px] rounded bg-gray-200' />
      </div>

      {/* Delivery Fee */}
      <div className='flex items-center justify-between'>
        <div className='h-[15px] w-[100px] rounded bg-gray-200' />
        <div className='h-[15px] w-[70px] rounded bg-gray-200' />
      </div>

      {/* Discounts */}
      <div className='flex items-center justify-between'>
        <div className='h-[15px] w-[90px] rounded bg-gray-200' />
        <div className='h-[15px] w-[70px] rounded bg-gray-200' />
      </div>

      {/* Total */}
      <div className='flex items-center justify-between pt-3'>
        <div className='h-[18px] w-[60px] rounded bg-gray-200' />
        <div className='h-[28px] w-[100px] rounded bg-gray-200' />
      </div>
    </div>
  );
};
