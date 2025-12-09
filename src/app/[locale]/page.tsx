// app/page.tsx (Server Component)
import { getSession } from '@/actions/auth';
import { SlideshowBanner } from 'Features/Home/SlideShowBanner';
import { Suspense, lazy } from 'react';

import dynamic from 'next/dynamic';

import ExploreCard from '@/components/Card/ExploreCard';
import BestSellerSkeleton from '@/components/Skeleton/BestSellerSkeleton';
import NewArrivalSkeleton from '@/components/Skeleton/NewArrivalSkeleton';
import ProductHighlightSkeleton from '@/components/Skeleton/ProductHighlightSkeleton';

const BestSeller = dynamic(() => import('Features/Home/BestSeller'), {
  ssr: true,
});
const NewArrival = dynamic(() => import('Features/Home/NewArrival'), {
  ssr: true,
});

const ProductHighlight = lazy(() => import('Features/Home/ProductHighlight'));

export default async function Home() {
  const session = await getSession();

  return (
    <>
      <SlideshowBanner />
      <section className='mx-auto max-w-[1240px] px-4 xl:px-0'>
        <section className='mx-auto flex flex-col gap-6 py-4 md:flex-row md:py-[44px]'>
          <ExploreCard bgColor='bg-yellow' title='Makeup' link='/shop' />
          <ExploreCard bgColor='bg-green' title='Skincare' link='/shop' />
        </section>

        <section className='py-4 md:py-8'>
          <Suspense fallback={<BestSellerSkeleton />}>
            <BestSeller {...{ session }} />
          </Suspense>
        </section>

        <section className='py-4 md:py-8'>
          <Suspense fallback={<NewArrivalSkeleton />}>
            <NewArrival {...{ session }} />
          </Suspense>{' '}
        </section>
      </section>
      <Suspense fallback={<ProductHighlightSkeleton />}>
        <ProductHighlight {...{ session }} />
      </Suspense>
    </>
  );
}
