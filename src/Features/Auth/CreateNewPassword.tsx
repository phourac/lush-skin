'use client';

import { Eye, EyeSlash } from 'iconsax-reactjs';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import ButtonBase from '@/components/Button/ButtonBase';
import CusInput from '@/components/CusInput/CusInput';
import CusDialog from '@/components/Dialog/CusDialog';

import useAuth from './useAuth';

interface ICreatePasswordInSubmit {
  password: string;
  showPassword?: boolean;
  conPassword?: string;
  showConPassword?: boolean;
}

const CreateNewPassword = ({
  setIsGetOpt,
  isGetOtp,
}: {
  setIsGetOpt: React.Dispatch<React.SetStateAction<boolean>>;
  isGetOtp: boolean;
}) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get('auth') === 'reset' && isGetOtp;
  const { removeAuthParam } = useAuth();
  const t = useTranslations('auth');

  // const router = useRouter();

  const { handleSubmit, control, setValue } = useForm<ICreatePasswordInSubmit>({
    defaultValues: {
      password: '',
      conPassword: '',
      showConPassword: false,
      showPassword: false,
    },
  });

  const handleGetOtp = () => {
    setIsGetOpt(!isGetOtp);
  };

  const onSubmit = () => {
    handleGetOtp();
  };
  const onClose = () => {
    removeAuthParam();
  };

  const showPassword = useWatch({ control, name: 'showPassword' });
  const showConPassword = useWatch({ control, name: 'showConPassword' });

  const togglePassword = () => {
    setValue('showPassword', !showPassword);
  };
  const toggleConPassword = () => {
    setValue('showConPassword', !showConPassword);
  };

  return (
    <CusDialog
      isOpen={isOpen}
      onClose={() => {}}
      title=''
      buttonText='Ok'
      loading={false}
      direction='bottom'
      height='auto'
      className='relative w-[534px] rounded-2xl px-4 py-6 md:px-6'
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-start gap-6'
      >
        {/* Header with title and close button */}
        <div className='flex w-full items-start justify-between'>
          <div className='space-y-3'>
            <h1 className='text-typography-base text-[18px] leading-[140%] font-semibold'>
              {t('Create new password')}{' '}
            </h1>
            <p className='text-typography-base text-[15px] leading-[140%] tracking-[-0.3px]'>
              {t('Make sure you have a strong password')}{' '}
            </p>
          </div>
          <button
            type='button'
            onClick={onClose}
            className='cursor-pointer transition-opacity hover:opacity-70'
          >
            <Image
              src='/assets/cancel.svg'
              alt='Close'
              width={20}
              height={20}
            />
          </button>
        </div>

        {/* Input Section */}
        <div className='w-full space-y-6 rounded-[12px] bg-white px-3 pt-4 pb-5 md:px-4'>
          {/* Phone number field */}
          <div className='space-y-1'>
            <h1 className='text-typography-base text-[15px] leading-[140%] font-normal tracking-[-0.3px]'>
              {t('Password')} <span className='text-typography-error'>*</span>
            </h1>
            <Controller
              name='password'
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field, fieldState: { error } }) => (
                <CusInput
                  rightElement={
                    <button
                      type='button'
                      onClick={togglePassword}
                      className='hover:text-primary mr-4 flex cursor-pointer items-center text-gray-500 transition-colors'
                    >
                      {showPassword ? (
                        <EyeSlash size='20' variant='Outline' />
                      ) : (
                        <Eye size='20' variant='Outline' />
                      )}
                    </button>
                  }
                  className='h-[48px]'
                  type={showPassword ? 'text' : 'password'}
                  placeholder={t('Enter password')}
                  error={!!error}
                  errorMessage={error?.message}
                  {...field}
                />
              )}
            />
          </div>

          <div className='space-y-1'>
            <h1 className='text-typography-base text-[15px] leading-[140%] font-normal tracking-[-0.3px]'>
              {t('Confirm Your Password')}{' '}
              <span className='text-typography-error'>*</span>
            </h1>
            <Controller
              name='conPassword'
              control={control}
              rules={{
                required: 'Confirm password is required',
                validate: (value, formValues) =>
                  value === formValues.password || 'Passwords do not match', // 👈 check match
              }}
              render={({ field, fieldState: { error } }) => (
                <CusInput
                  rightElement={
                    <button
                      type='button'
                      onClick={toggleConPassword}
                      className='hover:text-primary mr-4 flex cursor-pointer items-center text-gray-500 transition-colors'
                    >
                      {showConPassword ? (
                        <EyeSlash size='20' variant='Outline' />
                      ) : (
                        <Eye size='20' variant='Outline' />
                      )}
                    </button>
                  }
                  className='h-[48px]'
                  type={showConPassword ? 'text' : 'password'}
                  placeholder={t('Enter password')}
                  error={!!error}
                  errorMessage={error?.message} // 👈 show message
                  {...field}
                />
              )}
            />
          </div>
        </div>

        {/* Submit button */}
        <ButtonBase className='h-[48px] w-full rounded-full' type='submit'>
          {t('Continue')}
        </ButtonBase>
      </form>
    </CusDialog>
  );
};

export default CreateNewPassword;
