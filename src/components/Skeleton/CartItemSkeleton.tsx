const CartItemSkeleton = () => {
  return (
    <div className='border-border flex animate-pulse items-start gap-[22px] border-t py-4 last:border-b'>
      {/* Checkbox + Image */}
      <div className='flex items-center gap-[12px]'>
        <div className='h-[124px] w-[124px] flex-shrink-0 rounded-md bg-gray-200' />{' '}
        {/* Image */}
      </div>

      {/* Content */}
      <div className='flex w-full justify-between'>
        <div className='w-full lg:max-w-[270px]'>
          {/* Product name */}
          <div className='h-5 w-[70%] rounded bg-gray-200' />

          {/* Price + Actions */}
          <div className='mt-3 flex items-center justify-between gap-2'>
            {/* Mobile view */}
            <div className='block xl:hidden'>
              <div className='mb-2 h-5 w-[60px] rounded bg-gray-200' />
              <div className='h-4 w-[50px] rounded bg-gray-200' />
            </div>

            {/* Mobile qty + action */}
            <div className='flex gap-6 lg:hidden'>
              <div className='h-10 w-[100px] rounded-full bg-gray-200' />
              <div className='h-10 w-10 rounded-full bg-gray-200' />
            </div>
          </div>
        </div>

        {/* Desktop */}
        <div className='hidden items-center gap-6 lg:flex'>
          <div className='hidden xl:block'>
            <div className='mb-2 h-5 w-[60px] rounded bg-gray-200' />
            <div className='h-4 w-[50px] rounded bg-gray-200' />
          </div>
          <div className='h-10 w-[100px] rounded-full bg-gray-200' />
          <div className='h-10 w-10 rounded-full bg-gray-200' />
        </div>
      </div>
    </div>
  );
};

export default CartItemSkeleton;
