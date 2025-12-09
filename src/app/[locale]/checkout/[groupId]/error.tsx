'use client';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className='flex min-h-[70vh] flex-col items-center justify-center px-4 text-center'>
      <h1 className='text-[22px] font-medium text-black'>
        Something went wrong
      </h1>

      <p className='mt-2 max-w-md text-[15px] text-neutral-500'>
        There was a problem loading this product. Please try again.
      </p>

      <button
        onClick={reset}
        className='mt-8 inline-block rounded-full border border-black px-6 py-2 text-[15px] font-medium text-black transition hover:bg-black hover:text-white'
      >
        Retry
      </button>
    </div>
  );
}
