'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className='py-10 text-center'>
      <h2 className='text-xl font-semibold text-red-600'>
        Something went wrong
      </h2>
      <p className='mt-2 text-gray-600'>{error.message}</p>

      <button
        onClick={() => reset()}
        className='mt-4 rounded bg-black px-4 py-2 text-white'
      >
        Try Again
      </button>
    </div>
  );
}
