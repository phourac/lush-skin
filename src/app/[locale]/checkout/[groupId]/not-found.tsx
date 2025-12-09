'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex min-h-[70vh] flex-col items-center justify-center px-4 text-center'>
      <div className='mb-6'>
        <div className='text-[80px] leading-none font-semibold tracking-tight text-black/90'>
          404
        </div>
      </div>

      <h1 className='text-[22px] font-medium text-black'>Product Not Found</h1>

      <Link
        aria-label='Back to Shop'
        href='/shop'
        className='hover:bg-primary hover:border-primary mt-8 inline-block rounded-full border border-black px-6 py-2 text-[15px] font-medium text-black transition hover:text-white'
      >
        Back to Shop
      </Link>
    </div>
  );
}
