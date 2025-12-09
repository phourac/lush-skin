import { Link } from 'hooks/navigation';
import { useTranslations } from 'next-intl';
import React from 'react';

import Image from 'next/image';

const footerSections = [
  {
    title: 'Shop Now',
    links: [
      { name: 'Skincare', value: 'skincare' },
      { name: 'Makeup', value: 'makeup' },
    ],
  },
  {
    title: 'My Account',
    links: [
      { name: 'Profile', value: 'profile' },
      { name: 'Track Orders', value: 'track orders' },
      { name: 'Wish List', value: 'wish list' },
      { name: 'Delivery Address', value: 'delivery address' },
    ],
  },
  {
    title: 'LUSH SKIN',
    links: [
      { name: 'Affiliate', value: '/affiliate' },
      { name: 'Return Policy', value: '/document/return-policy' },
      { name: 'Terms of service', value: '/document/term' },
      { name: 'Privacy policy', value: '/document/privacy-policy' },
      { name: 'Contact us', value: '/about' },
    ],
  },
  {
    title: 'Stay Connected',
    socials: [
      { icon: '/assets/facebook.svg', alt: 'Facebook' },
      { icon: '/assets/youtube.svg', alt: 'YouTube' },
      { icon: '/assets/twitter.svg', alt: 'Twitter' },
      { icon: '/assets/telegram.svg', alt: 'Telegram' },
    ],
  },
];

const FooterInfo = () => {
  const t = useTranslations('Footer');

  return (
    <div className='mx-auto flex max-w-[1240px] flex-col items-start justify-start gap-[32px] px-4 py-[40px] sm:flex-row md:gap-[64px] xl:px-0'>
      {/* Logo & Description */}
      <div className='max-w-[374px] space-y-3'>
        <Image
          src='/images/logo-navbar.svg'
          width={184}
          height={40}
          alt='Logo'
          className='h-auto w-auto'
        />
        <h1 className='text-typography-secondary text-[15px] leading-[21px] font-normal'>
          {t('experince')}
        </h1>
      </div>

      {/* Footer Sections */}
      <div className='grid w-full grid-cols-2 gap-8 lg:grid-cols-4'>
        {footerSections.map((section, idx) => (
          <div key={idx} className='space-y-[12px]'>
            <h1 className='text-typography-dark text-[15px] leading-[21px] font-semibold'>
              {t(section.title)}
            </h1>

            {/* Normal links */}
            {section.links && (
              <div className='text-typography-secondary flex flex-col gap-[8px] text-[15px] leading-[21px] font-medium tracking-[-0.3px]'>
                {section.links.map((link, i) => (
                  <Link
                    href={link.value}
                    key={i}
                    className='hover:underline'
                    aria-label={'Section Link'}
                  >
                    <h1>{t(link.name)}</h1>
                  </Link>
                ))}
              </div>
            )}

            {section.socials && (
              <div className='text-typography-secondary flex flex-wrap gap-[8px] text-[15px] leading-[21px] font-medium tracking-[-0.3px]'>
                {section.socials.map((social, i) => (
                  <div
                    key={i}
                    className='bg-paper border-border relative flex h-[36px] w-[36px] items-center justify-center rounded-[6px] border'
                  >
                    <div className='relative h-[20px] w-[20px]'>
                      <Image
                        src={social.icon}
                        alt={social.alt}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterInfo;
