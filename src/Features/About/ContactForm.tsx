'use client';

import { useTranslations } from 'next-intl';
import React, { memo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Image from 'next/image';

import ButtonBase from '@/components/Button/ButtonBase';
import CusInput from '@/components/CusInput/CusInput';
import CusTextarea from '@/components/CusInput/CusTextarea';

const contactus = [
  { name: 'Customer Support', des: '012121212', icon: '/assets/phone.svg' },
  { name: 'Customer Support', des: '012121212', icon: '/assets/phone.svg' },
  { name: 'Address', des: 'Phnom Penh, Cambodia', icon: '/assets/map.svg' },
  {
    name: 'Telegram',
    des: 't.me/lush_skincc',
    icon: '/assets/telegram-contact.svg',
  },
];

const ContactForm = () => {
  const t = useTranslations('about');

  const { handleSubmit, control, reset } = useForm({
    defaultValues: { name: '', subject: '', message: '' },
  });

  const onSubmit = () => {
    reset();
  };

  return (
    <div className='flex flex-col gap-16 pt-16 sm:flex-row sm:gap-[124px]'>
      {/* CONTACT INFO */}
      <div className='flex flex-col gap-[44px]'>
        {contactus.map((item, idx) => (
          <div className='flex items-center gap-3' key={idx}>
            <div className='bg-primary flex h-[48px] w-[48px] items-center justify-center overflow-hidden rounded-full'>
              <Image
                src={item.icon}
                alt={item.name}
                width={20}
                height={20}
                className='h-5 w-5 object-contain'
              />
            </div>

            <div className='flex flex-col'>
              <h1 className='text-typography-base text-[15px] leading-[21px] tracking-[-0.3px]'>
                {t(item.name)}
              </h1>
              <p className='text-typography-base text-[20px] leading-[28px] font-semibold whitespace-nowrap'>
                {item.des}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full flex-col gap-8'
      >
        <h1 className='text-typography-base text-start text-[28px] leading-[140%] font-semibold tracking-[-0.56px]'>
          {t('Get in Touch with Us')}
        </h1>

        <div className='grid grid-cols-1 items-center gap-x-4 gap-y-4 whitespace-nowrap lg:grid-cols-[192px_1fr]'>
          <label className='text-start text-[15px] leading-[140%] tracking-[-0.3px]'>
            {t('Your name')}
          </label>
          <Controller
            control={control}
            name='name'
            rules={{ required: true }}
            render={({ field }) => (
              <CusInput {...field} className='h-[48px] w-full' placeholder='' />
            )}
          />

          <label className='text-start text-[15px] leading-[140%] tracking-[-0.3px]'>
            {t('Subject')}
          </label>
          <Controller
            control={control}
            name='subject'
            rules={{ required: true }}
            render={({ field }) => (
              <CusInput {...field} className='h-[48px] w-full' placeholder='' />
            )}
          />

          <label className='self-start text-start text-[15px] leading-[140%] tracking-[-0.3px]'>
            {t('Your message (optional)')}
          </label>
          <Controller
            control={control}
            name='message'
            render={({ field }) => (
              <CusTextarea {...field} rows={4} className='w-full self-start' />
            )}
          />
        </div>

        <div className='flex justify-end'>
          <ButtonBase
            type='submit'
            className='flex h-[48px] w-[146px] items-center justify-center rounded-[12px]'
          >
            {t('SUBMIT')}
          </ButtonBase>
        </div>
      </form>
    </div>
  );
};

export default memo(ContactForm);
