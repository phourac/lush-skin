'use client';

import ProductCardSkeleton from './ProductCardSkeleton';

export default function ProductShopListSkeleton() {
  return (
    <div className='grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3'>
      {Array.from({ length: 9 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
