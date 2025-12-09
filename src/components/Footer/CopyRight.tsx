import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

const CopyRight = () => {
  const topupWays = [
    {
      icon: '/assets/aba.svg',
    },
    {
      icon: '/assets/khqr.svg',
    },
    {
      icon: '/assets/alipay.svg',
    },
    {
      icon: '/assets/wechat.svg',
    },
    {
      icon: '/assets/visa.svg',
    },
    {
      icon: '/assets/master.svg',
    },
  ];

  const t = useTranslations('Footer');

  return (
    <div className='mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-2 px-4 py-6 text-center lg:justify-between xl:px-0'>
      <div className='flex flex-wrap items-center justify-center gap-3'>
        <h1 className='text-typography-primary text-[14px] leading-[18px] font-normal'>
          {t('weAccept')}
        </h1>
        <div className='flex flex-wrap items-center justify-center gap-2'>
          {topupWays.map((item, idx) => (
            <Image
              alt=''
              key={idx}
              src={item.icon}
              width={0}
              height={0}
              sizes='auto'
              className='h-auto w-auto'
            />
          ))}
        </div>
      </div>

      <div className='text-typography-secondary flex flex-col items-center justify-center text-[15px] font-normal lg:items-end'>
        <h1 className='leading-[21px] tracking-[-0.3px]'>{t('copyright')}</h1>
        <h1 className='leading-[21px] tracking-[-0.3px]'>
          CR No. 1011230705691 — VAT No. 31000600003
        </h1>
      </div>
    </div>
  );
};

export default CopyRight;
