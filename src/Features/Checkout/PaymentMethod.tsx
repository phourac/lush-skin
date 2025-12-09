'use client';

import { useTranslations } from 'next-intl';
import React, { useCallback, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import Image from 'next/image';

import CheckboxCustom from '@/components/Button/CheckboxCustom';

import { cash } from '@/utils/data-util';

const PaymentMethod = ({
  paymentMethod,
}: {
  paymentMethod: IOrder.PaymentMethod[];
}) => {
  const { setValue, control } = useFormContext<IPlaceOrder.IItemToPlaceOrder>();

  const t = useTranslations('checkout');

  const selectedMethod = useWatch({ control, name: 'paymentMethodId' });

  const [fallbacks, setFallbacks] = useState<Record<number, string>>({});

  const handleSelect = useCallback(
    (id: number) => {
      setValue('paymentMethodId', id, { shouldDirty: true });
    },
    [setValue]
  );

  const handleImgError = (id: number) => {
    setFallbacks((prev) => ({
      ...prev,
      [id]: '/assets/khqr-checkout.svg',
    }));
  };

  const allMethods = [...paymentMethod, ...cash];

  return (
    <div>
      <h1 className='text-typography-base pb-6 text-[18px] leading-[140%] font-semibold'>
        {t('Payment Method')}
      </h1>

      <div>
        {allMethods.map((met, index) => {
          const src =
            fallbacks[met.id] ||
            met.thumbnailUrl ||
            '/assets/khqr-checkout.svg';

          return (
            <div key={met.id}>
              <div
                className='flex cursor-pointer items-center justify-between py-3'
                onClick={() => handleSelect(met.id)}
              >
                <div className='flex items-center gap-3'>
                  <div className='relative h-[44px] w-[44px]'>
                    <Image
                      src={src}
                      alt={met.name}
                      fill
                      priority
                      onError={() => handleImgError(met.id)}
                    />
                  </div>

                  <div>
                    <h1 className='text-typography-base text-[18px] leading-[140%] font-semibold'>
                      {met.name === 'BAKONG_PAYMENT' ? t('KHQR') : met.name}
                    </h1>

                    {met.name === 'BAKONG_PAYMENT' && (
                      <p className='text-typography-base text-[15px] leading-[140%] font-medium tracking-[-0.3px]'>
                        {t('Scan to pay using KHQR')}
                      </p>
                    )}
                  </div>
                </div>

                <CheckboxCustom
                  checked={selectedMethod === met.id}
                  onChange={() => handleSelect(met.id)}
                  shape='rounded'
                  iconWidth={14}
                  iconHeight={14}
                  boxSize={24}
                />
              </div>

              {index < paymentMethod.length - 1 && (
                <hr className='bg-border my-4 h-px border-0' />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(PaymentMethod);
