import { useTranslations } from 'next-intl';
import React from 'react';

import ButtonBase from '@/components/Button/ButtonBase';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';

const CartSummary = ({
  subTotal,
  totalItems,
  totalDiscount,
  loadingRunPrecheckout,
}: {
  subTotal: number | undefined;
  totalItems: number;
  totalDiscount: number;
  loadingRunPrecheckout: boolean;
}) => {
  const t = useTranslations('cart');
  return (
    <div className='border-border sticky top-[260px] flex flex-col items-center gap-6 rounded-[12px] border-[1px] bg-white p-4'>
      <h5 className='text-typography-base text-[18px] leading-[140%] font-semibold'>
        {t('Cart Summary')}
      </h5>
      <div className='text-typography-base flex w-full items-center justify-between text-[15px] leading-[140%] font-medium tracking-[-2%]'>
        <h1>
          {t('Totals Item')} ({totalItems})
        </h1>
        <h1>US${subTotal?.toFixed(2)}</h1>
      </div>

      <div className='text-typography-base flex w-full items-center justify-between text-[15px] leading-[140%] font-medium tracking-[-2%]'>
        <h1>{t('Discounts')}</h1>
        <h1>-US${Math.abs(totalDiscount)?.toFixed(2)}</h1>
      </div>

      <div className='flex w-full items-center justify-between'>
        <h1 className='text-typography-base text-[15px] leading-[140%] font-medium tracking-[-2%]'>
          {t('Subtotal')}
        </h1>
        <h1 className='text-primary text-[24px] leading-[130%] font-semibold'>
          US${subTotal?.toFixed(2)}
        </h1>
      </div>

      <ButtonBase
        type='submit'
        className='w-full'
        disabled={totalItems === 0 || loadingRunPrecheckout}
      >
        {loadingRunPrecheckout ? <LoadingSpinner size={18} /> : t('Checkout')}
      </ButtonBase>
    </div>
  );
};

export default CartSummary;
