'use client';

import { SessionPayload } from '@/actions/auth';
import { useRequest } from 'ahooks';
import BANNER_API from 'api/Banner';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React from 'react';

import EmptyData from '@/components/EmptyData';
import ListHorizontal from '@/components/List/ListHorizontal';
import BestSellerSkeleton from '@/components/Skeleton/BestSellerSkeleton';
import TextGradient from '@/components/Text/TextGradient';

import useBestSellerProducts from './useBestSellerProducts';

const BestSeller = ({ session }: { session: SessionPayload | null }) => {
  const t = useTranslations('body');
  const {
    loading,
    data,
    pagination,
    listProductBestSeller,
    handlePrefetch,
    handleNextPage,
    handlePrevPage,
    error,
    refresh,
  } = useBestSellerProducts(session);

  const { data: dataBanner, loading: loadingBanner } = useRequest(() =>
    BANNER_API.getBanner({
      displayType: 'BOXED',
      page: 1,
      pageSize: 1000,
    })
  );

  if (error) {
    return (
      <EmptyData
        title={`Error ${(error as any).status}`}
        description={error.message}
        btnTitle='Refresh'
        onRefresh={refresh}
      />
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
      <div className='flex items-center justify-center'>
        <TextGradient text={t('Best Seller')} />
      </div>

      <div className='pt-6'>
        {listProductBestSeller.length === 0 ? (
          <BestSellerSkeleton />
        ) : (
          <ListHorizontal
            defaultData={data}
            loading={loading}
            listProduct={listProductBestSeller}
            bannerAlt=''
            bannerSrc={dataBanner?.data[0].imageUrl || ''}
            bannerLink={dataBanner?.data[0].link || ''}
            loadingBanner={loadingBanner}
            responsiveBreakpoints={{ sm: 2, md: 2, lg: 2, xl: 2, xxl: 3 }}
            width={269}
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

export default BestSeller;
