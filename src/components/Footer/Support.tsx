import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

const Support = () => {
  const support = [
    {
      icon: '/assets/phone.svg',
      name: 'Customer Support',
      subName: '012121212',
    },
    {
      icon: '/assets/map.svg',
      name: 'Our Store',
      subName: 'View Map',
    },
    {
      icon: '/assets/telegram-contact.svg',
      name: 'Telegram',
      subName: 'Go to Support',
    },
  ];

  const t = useTranslations('Footer');

  return (
    <div
      className='relative flex w-full items-center py-[16px]'
      style={{
        backgroundImage: `
          url('/images/shop-now-navbar.png'),
          linear-gradient(180deg, #EB475A 0%, #EB687C 100%)
        `,
        backgroundRepeat: 'no-repeat, no-repeat',
        backgroundPosition: '-219.02px 0px, center',
        backgroundSize: '216.667% 100%, cover',
      }}
    >
      {/* Wrapper needs full width */}
      <div className='mx-auto flex w-full max-w-[1240px] flex-wrap items-center justify-start gap-8 px-4 lg:justify-between xl:px-0'>
        {/* Left side */}
        <div className='flex flex-col gap-1'>
          <h1 className='text-[20px] leading-[28px] font-semibold text-white'>
            {t('help')}
          </h1>
          <p className='text-[15px] leading-[28px] font-medium tracking-[-0.3px] text-white'>
            {t('getHelp')}
          </p>
        </div>

        {/* Right side */}
        <div className='flex flex-wrap items-center gap-4 sm:gap-[44px]'>
          {support.map((item, idx) => (
            <div key={idx} className='flex items-center gap-3'>
              <div className='bg-primary rounded-full p-3'>
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={24}
                  height={24}
                  className='h-6 w-6'
                />
              </div>

              <div className='flex flex-col'>
                <h1 className='text-[15px] leading-[21px] font-medium text-white'>
                  {t(item.name)}
                </h1>
                <p className='text-[20px] leading-[28px] font-semibold text-white'>
                  {t(item.subName)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
