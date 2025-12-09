'use client';

import { SessionPayload } from '@/actions/auth';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import ListHorizontal from '@/components/List/ListHorizontal';
import BestSellerSkeleton from '@/components/Skeleton/BestSellerSkeleton';
import TextGradient from '@/components/Text/TextGradient';

import { usePopularProducts } from './usePopularProducts';

const PopularPickList = ({ session }: { session: SessionPayload | null }) => {
  const t = useTranslations('popular');
  const {
    loading,
    data,
    pagination,
    listProductPopularProduct,
    handlePrefetch,
    handleNextPage,
    handlePrevPage,
    error,
  } = usePopularProducts(session);
  if (error || listProductPopularProduct?.length === 0) {
    return null;
  }
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div className='flex items-center justify-center pt-8'>
        <TextGradient text={t('Our popular picks')} />
      </div>

      <div className='pt-6'>
        {listProductPopularProduct?.length === 0 && loading ? (
          <BestSellerSkeleton />
        ) : (
          <ListHorizontal
            defaultData={data}
            loading={loading}
            listProduct={listProductPopularProduct}
            responsiveBreakpoints={{ sm: 1, md: 2, lg: 3, xl: 4, xxl: 5 }}
            width={222.2}
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

export default PopularPickList;
