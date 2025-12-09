import { Link } from 'hooks/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

const ProductHighlightCard = ({
  pro,
  length,
}: {
  pro: IProducts.IProductData;
  length: number;
}) => {
  const t = useTranslations('body');
  return (
    <div
      className={`bg-purple relative flex flex-col items-start justify-start gap-6 rounded-[24px] p-6 sm:flex-col sm:items-start sm:justify-start sm:gap-6 sm:rounded-[24px] sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-[82px] ${
        length === 1
          ? 'w-full'
          : 'w-[calc(100vw-32px)] sm:w-[calc(100vw-8px)] lg:w-[967px]'
      }`}
    >
      {/* Decorative background image (only on larger screens) */}
      {/* {index === 0 && (
        <Image
          src='/images/product-light.png'
          alt=''
          width={258}
          height={258}
          className='absolute -bottom-16 -left-16 z-0 hidden lg:block'
        />
      )} */}

      {/* Product image */}
      <div className='relative z-10 mx-auto w-full max-w-[398px] flex-shrink-0 sm:mx-0'>
        <Image
          src={pro.productImages[0].imageUrl}
          alt=''
          width={398}
          height={383}
          className='h-auto w-full object-cover'
        />
      </div>

      {/* Product details */}
      <div className='relative z-10 w-full flex-1 space-y-3 text-left'>
        <h1 className='text-pink text-[20px] leading-[1.3] font-semibold sm:text-[22px] lg:text-[24px]'>
          {pro.nameEn}
        </h1>

        <h2 className='text-pink text-[28px] leading-[1.3] font-semibold sm:text-[32px] lg:text-[36px]'>
          US$ {pro.productVariants[0].afterDiscount.toFixed(2)}
        </h2>

        <p className='text-pink line-clamp-6 text-[14px] leading-[21px] font-medium tracking-[-0.3px] sm:line-clamp-none sm:text-[15px]'>
          {pro.description}
        </p>

        <div className='flex justify-start'>
          <Link
            href={`/shop/product/${pro.id}`}
            className='bg-green text-purple cursor-pointer rounded-[8px] px-5 py-2.5 text-[15px] font-medium tracking-[-0.3px] transition-all duration-200 hover:opacity-90'
          >
            {t('Shop Now')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductHighlightCard;
