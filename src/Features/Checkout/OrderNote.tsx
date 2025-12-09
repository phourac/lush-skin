'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import CusTextarea from '@/components/CusInput/CusTextarea';

const OrderNote = () => {
  const { control } = useFormContext<IPlaceOrder.IItemToPlaceOrder>();
  const t = useTranslations('checkout');

  return (
    <div>
      <h1 className='text-typography-base pb-6 text-[18px] leading-[140%] font-semibold'>
        {t('Order Note')}
      </h1>

      <Controller
        name='cusRemark'
        control={control}
        render={({ field }) => (
          <CusTextarea
            {...field}
            rows={4}
            placeholder={t('Add your note here')}
            className='bg-white p-[10px]'
          />
        )}
      />
    </div>
  );
};

export default OrderNote;
