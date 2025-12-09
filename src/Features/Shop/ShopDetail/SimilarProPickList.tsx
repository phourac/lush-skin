'use client';

import { SessionPayload } from '@/actions/auth';
import { motion } from 'framer-motion';
import React from 'react';

import ListHorizontal from '@/components/List/ListHorizontal';
import BestSellerSkeleton from '@/components/Skeleton/BestSellerSkeleton';
import TextGradient from '@/components/Text/TextGradient';

import { useSimilarProducts } from './useSimilarProducts';

const SimilarProPickList = ({
  session,
  prodId,
}: {
  session: SessionPayload | null;
  prodId: number;
}) => {
  const {
    error,
    loading,
    data,
    pagination,
    listProductSimilarProduct,
    setApiPageSimilarProduct,
    setPageSimilarProduct,
  } = useSimilarProducts(session, prodId);

  if (error) {
    return null;
  }

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div className='flex items-center justify-center pt-8'>
        <TextGradient text='Similar brand picks' />
      </div>

      <div className='pt-6'>
        {listProductSimilarProduct?.length === 0 ? (
          <BestSellerSkeleton />
        ) : (
          <ListHorizontal
            defaultData={data}
            loading={loading}
            listProduct={listProductSimilarProduct}
            responsiveBreakpoints={{ sm: 2, md: 2, lg: 3, xl: 4, xxl: 5 }}
            width={222.2}
            pagination={pagination}
            onPrefetch={() => setApiPageSimilarProduct((p) => p + 1)}
            onNextPage={() => setPageSimilarProduct((p) => p + 1)}
            onPrevPage={() => setPageSimilarProduct((p) => (p > 1 ? p - 1 : 1))}
          />
        )}
      </div>
    </motion.div>
  );
};

export default SimilarProPickList;
