'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Controller } from 'react-hook-form';

import ButtonBase from '@/components/Button/ButtonBase';
import CusInput from '@/components/CusInput/CusInput';
import CusSelected from '@/components/CusInput/CusSelected';
import ErrDialog from '@/components/Dialog/ErrorDialog';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';

import { usePersonalForm } from './usePersonalForm';

const monthOptions = [
  { label: '01', value: '1' },
  { label: '02', value: '2' },
  { label: '03', value: '3' },
  { label: '04', value: '4' },
  { label: '05', value: '5' },
  { label: '06', value: '6' },
  { label: '07', value: '7' },
  { label: '08', value: '8' },
  { label: '09', value: '9' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
];

const Personal = ({
  getProfile,
  refreshProfile,
}: {
  getProfile: IProfile.IProfileRes | undefined;
  refreshProfile: () => void;
}) => {
  const t = useTranslations('profile');

  const { control, handleSubmit, onSubmit, loadingUpdateProfile, error } =
    usePersonalForm(getProfile, refreshProfile);

  const genderOptions = [
    { label: t('Male'), value: 'MALE' },
    { label: t('Female'), value: 'FEMALE' },
  ];

  return (
    <>
      <ErrDialog ref={error} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='border-border flex flex-col gap-4 rounded-[16px] border p-4 md:gap-8 md:p-8'
      >
        <h1 className='text-typography-base text-[18px] leading-[140%] font-semibold'>
          {t('Personal')}
        </h1>

        {/* Form fields */}
        <div className='flex items-end justify-between gap-8'>
          <div className='flex w-full flex-col gap-6'>
            {/* Full Name */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-6'>
              <label className='text-typography-base w-[187px] shrink-0 text-[15px]'>
                {t('Full Name')}
              </label>
              <Controller
                name='firstname'
                control={control}
                render={({ field }) => (
                  <CusInput
                    {...field}
                    placeholder={t('Enter full name')}
                    className='h-[48px] flex-1'
                  />
                )}
              />
            </div>

            {/* Gender */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-6'>
              <label className='text-typography-base w-[187px] shrink-0 text-[15px]'>
                {t('Gender')}
              </label>
              <Controller
                name='gender'
                control={control}
                rules={{ required: false }}
                render={({ field }) => (
                  <CusSelected
                    className='h-[48px] flex-1'
                    options={genderOptions}
                    value={
                      genderOptions.find((opt) => opt.value === field.value) ??
                      null
                    }
                    onChange={(opt) => field.onChange(opt?.value)}
                  />
                )}
              />
            </div>

            {/* Date of Birth */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-6'>
              <label className='text-typography-base w-[187px] shrink-0 text-[15px]'>
                {t('Date of Birth')}
              </label>
              <div className='flex flex-1 flex-col gap-4 sm:flex-row'>
                {/* Day */}
                <Controller
                  name='day'
                  control={control}
                  render={({ field }) => (
                    <CusInput
                      {...field}
                      placeholder={t('Day')}
                      className='h-[48px] w-full'
                      maxLength={2}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ''); // remove non-numeric
                        if (value.length <= 2) {
                          field.onChange(value);
                        }
                      }}
                      value={field.value || ''}
                    />
                  )}
                />

                {/* Month */}
                <Controller
                  name='month'
                  control={control}
                  render={({ field }) => (
                    <CusSelected
                      className='h-[48px] w-full'
                      options={monthOptions}
                      value={
                        monthOptions.find((opt) => opt.value === field.value) ??
                        null
                      }
                      onChange={(opt) => field.onChange(opt?.value)}
                      placeholder={t('Month')}
                    />
                  )}
                />

                {/* Year */}
                <Controller
                  name='year'
                  control={control}
                  render={({ field }) => (
                    <CusInput
                      {...field}
                      placeholder={t('Year')}
                      className='h-[48px] w-full'
                      maxLength={4}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ''); // remove non-numeric
                        if (value.length <= 4) {
                          field.onChange(value);
                        }
                      }}
                      value={field.value || ''}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <div className='hidden justify-end lg:flex'>
            <ButtonBase
              type='submit'
              className='h-[48px] min-w-[146px] rounded-[12px] px-4'
            >
              {loadingUpdateProfile ? <LoadingSpinner size={18} /> : 'Update'}
            </ButtonBase>
          </div>
        </div>

        <div className='flex justify-end lg:hidden'>
          <ButtonBase
            type='submit'
            className='h-[48px] min-w-[146px] rounded-[12px] px-4'
          >
            {loadingUpdateProfile ? <LoadingSpinner size={18} /> : 'Update'}
          </ButtonBase>
        </div>

        {/* Submit */}
      </form>
    </>
  );
};

export default Personal;
