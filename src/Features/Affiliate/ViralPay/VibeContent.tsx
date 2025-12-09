'use client';

import { type Variants, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import React, { memo } from 'react';

import Image from 'next/image';

const Vibe = [
  {
    name: 'Lifestyle',
    des: 'Show off how LUSH Skin fits into your everyday glow',
    icon: 'vibe-lifestyle.svg',
  },
  {
    name: 'Tutorial',
    des: 'Teach others how to achieve that flawless finish',
    icon: 'vibe-tutorial.svg',
  },
  {
    name: 'Entertainment',
    des: 'Make it fun, creative, and uniquely you',
    icon: 'vide-entertainment.svg',
  },
  {
    name: 'Product Review',
    des: 'Share your honest thoughts and results',
    icon: 'vide-productreview.svg',
  },
  {
    name: 'Other',
    des: 'Surprise us with something totally different!',
    icon: 'vibe-other.svg',
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemAnim: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const VibeContent = () => {
  const t = useTranslations('affiliate');

  return (
    <motion.section
      initial='hidden'
      whileInView='show'
      viewport={{ once: true }}
      variants={container}
      className='bg-purple relative z-10 w-full overflow-hidden py-16'
    >
      {/* Background Layer */}
      <div className='absolute inset-0 flex items-center justify-center'>
        <div
          className='absolute h-[1211px] w-[2008px] rotate-[165deg]'
          style={{
            backgroundImage: "url('/images/vibe-background.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            mixBlendMode: 'screen',
            backgroundColor: '#4f58b5',
          }}
        />
      </div>

      {/* Decorative Icon */}
      <motion.div variants={itemAnim} className='absolute right-0 bottom-0'>
        <Image
          src='/assets/icon-vibe.svg'
          alt='Vibe Decoration Icon'
          width={284}
          height={284}
          sizes='(max-width: 768px) 150px, 284px'
          className='h-auto w-auto opacity-70'
          loading='lazy'
        />
      </motion.div>

      {/* Content Wrapper */}
      <div className='mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-16 px-4 pb-8 md:flex-row xl:px-0'>
        {/* Left Section */}
        <motion.div
          variants={itemAnim}
          className='w-full max-w-[417px] space-y-8'
        >
          <h2 className='text-pink text-[48px] leading-[130%] font-semibold tracking-[-0.96px]'>
            {t('Pick Your Vibe Contents')}
          </h2>

          <div className='text-pink space-y-6 text-[18px] leading-[150%]'>
            <p>
              {t(
                'Whatever your style, there’s a ViralPay category just for you'
              )}
            </p>
            <p>
              {t(
                'Whether you’re sharing your daily beauty routine, testing out new skincare products, or filming a creative skit, we want to see your personality shine Choose the content type that fits your flair'
              )}
            </p>
          </div>
        </motion.div>

        {/* Right Grid */}
        <motion.div
          variants={container}
          className='z-20 grid w-full grid-cols-1 gap-[30px] xl:grid-cols-2'
        >
          {Vibe.map((item, index) => (
            <motion.div
              key={item.name}
              variants={itemAnim}
              whileHover={{ scale: 1.04 }}
              className={`bg-pink flex items-start gap-6 rounded-[16px] p-6 ${
                index === Vibe.length - 1 ? 'xl:col-span-2' : ''
              }`}
            >
              <div className='bg-purple flex size-12 shrink-0 items-center justify-center rounded-full'>
                <Image
                  src={`/assets/${item.icon}`}
                  width={24}
                  height={24}
                  alt={item.name}
                  loading='lazy'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <h3 className='text-purple text-[26px] leading-[140%] font-medium tracking-[-0.26px]'>
                  {t(item.name)}
                </h3>

                <p className='text-purple text-[16px] leading-[150%] tracking-[-0.16px]'>
                  {t(item.des)}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default memo(VibeContent);
