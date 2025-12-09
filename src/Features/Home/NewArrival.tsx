'use client';

import { SessionPayload } from '@/actions/auth';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import ListHorizontal from '@/components/List/ListHorizontal';
import BestSellerSkeleton from '@/components/Skeleton/BestSellerSkeleton';
import TextGradient from '@/components/Text/TextGradient';

import useNewArrivalProducts from './useNewArrivalProducts';

const NewArrival = ({ session }: { session: SessionPayload | null }) => {
  const t = useTranslations('body');
  const {
    loading,
    data,
    pagination,
    listProductNewArrival,
    handlePrefetch,
    handleNextPage,
    handlePrevPage,
    error,
  } = useNewArrivalProducts(session);

  if (error || listProductNewArrival?.length === 0) {
    return null;
  }

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div className='flex items-center justify-center'>
        <TextGradient text={t('New Arrivals')} />
      </div>

      <p className='text-typography-base pt-1 text-center text-[15px]'>
        {t('New in')}
      </p>

      <div className='pt-6'>
        {listProductNewArrival?.length === 0 && loading ? (
          <BestSellerSkeleton />
        ) : (
          <ListHorizontal
            defaultData={data}
            responsiveBreakpoints={{ sm: 2, md: 2, lg: 2, xl: 3, xxl: 4 }}
            loading={loading}
            listProduct={listProductNewArrival}
            width={292}
            pagination={pagination}
            onPrefetch={handlePrefetch}
            onNextPage={handleNextPage}
            onPrevPage={handlePrevPage}
          />
        )}
      </div>
    </motion.div>
  );
};

export default NewArrival;
