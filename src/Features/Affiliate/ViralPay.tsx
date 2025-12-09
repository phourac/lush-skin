import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

const viral_pay = [
  { name: 'Starter', view: '100', price: '$0 – $499' },
  { name: 'Rising Star', view: '100', price: '$0 – $499' },
  { name: 'Pro Influencer', view: '100', price: '$0 – $499' },
];

const ViralPay = React.memo(() => {
  const t = useTranslations('affiliate');

  return (
    <>
      <div className='flex flex-col items-center gap-4 py-8'>
        <p className='text-purple text-[18px] leading-[140%] font-semibold'>
          {t('Introducing the Viral Pay')}
        </p>
        <p className='text-center text-[18px] leading-[140%] font-semibold text-black'>
          {t('The More You Share, The More You Earn')}
        </p>
      </div>

      <div className='space-y-4 pb-12'>
        {viral_pay.map((item, idx) => (
          <div
            key={idx}
            className='border-border flex flex-col justify-between gap-4 rounded-[16px] border p-8 sm:flex-row sm:items-center'
          >
            <div className='flex items-center gap-4 sm:w-[289px]'>
              <div className='bg-primary rounded-full p-3'>
                <div className='relative h-[21px] w-[21px]'>
                  <Image
                    src='/assets/viral-pay.svg'
                    alt='viral pay icon'
                    fill
                    loading='lazy'
                  />
                </div>
              </div>

              <h1 className='text-typography-base text-[20px] leading-[140%] font-semibold'>
                {t(item.name)}
              </h1>
            </div>

            <p className='text-typography-base text-[15px] leading-[140%] tracking-[-0.3px]'>
              {item.view} {t('Views')}
            </p>

            <h1 className='text-purple text-[18px] leading-[140%] font-semibold'>
              {item.price}
            </h1>
          </div>
        ))}
      </div>
    </>
  );
});

ViralPay.displayName = 'ViralPay';

export default ViralPay;
