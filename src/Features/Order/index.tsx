import { useTranslations } from 'next-intl';
import React, { Suspense } from 'react';

import dynamic from 'next/dynamic';

import { SkeletonOrderCard } from '@/components/Skeleton/SkeletonOrderCard';

const OrderHistoryList = dynamic(() => import('./OrderHistoryList'), {
  ssr: true,
});

const OrderList = () => {
  const t = useTranslations('order');
  return (
    <div className='flex flex-col'>
      <div className='space-y-4 pt-8'>
        <h1 className='text-typography-base text-[28px] leading-[140%] font-semibold tracking-[-0.56px]'>
          {t('Purchase Orders')}
        </h1>

        <p className='text-typography-base text-[15px] leading-[140%] font-medium tracking-[-0.3px]'>
          {t('We appreciate your order — thank you for choosing Lush Skin!')}
        </p>
      </div>

      {/* Suspense Loading State */}
      <Suspense fallback={<SkeletonOrderCard />}>
        <OrderHistoryList />
      </Suspense>
    </div>
  );
};

export default OrderList;
