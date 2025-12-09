import { getSession } from '@/actions/auth';
import React from 'react';

import ProductInfo from './ProductInfo';
import ProductThumbnail from './ProductThumnail';

const ProductDetail = async ({
  productDetail,
}: {
  productDetail: IProducts.IProductDetailData;
}) => {
  const session = await getSession();
  return (
    <div className='flex flex-col items-start justify-between gap-8 pt-8 pb-[64px] md:gap-[82px] lg:flex-row'>
      {productDetail?.productImages && (
        <ProductThumbnail productImages={productDetail.productImages} />
      )}
      <ProductInfo productDetail={productDetail} session={session} />
    </div>
  );
};

export default ProductDetail;
