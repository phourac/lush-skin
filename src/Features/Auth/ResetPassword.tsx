'use client';

import { useRequest } from 'ahooks';
import AUTH_API from 'api/Auth';
import { useBreakPoints } from 'hooks/useBreakPoints';
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import ResendOtpButton from '@/components/AuthCom/ResendOtpButton';
import ButtonBase from '@/components/Button/ButtonBase';
import CusInput from '@/components/CusInput/CusInput';
import CusDialog from '@/components/Dialog/CusDialog';

import { sanitizePhoneInput, validateKhPhone } from '@/utils/validate-utils';

import useAuth from './useAuth';

interface IResetPasswordInSubmit {
  username: string;
  otp: string;
}

const ResetPassword = ({
  setIsGetOpt,
  isGetOtp,
}: {
  setIsGetOpt: React.Dispatch<React.SetStateAction<boolean>>;
  isGetOtp: boolean;
}) => {
  const searchParams = useSearchParams();
  const isOpen = searchParams.get('auth') === 'reset' && !isGetOtp;
  const { removeAuthParam, openSignIn } = useAuth();
  const [isCounting, setIsCounting] = useState(false);
  const t = useTranslations('auth');
  const { isSmUp } = useBreakPoints();

  // const router = useRouter();

  const { handleSubmit, control } = useForm<IResetPasswordInSubmit>({
    defaultValues: {
      username: '',
      otp: '',
    },
  });

  const {
    // run: runSignUp,
    // loading: loadingSigUp,
    // error: errorSignUp,
  } = useRequest(AUTH_API.signUp, {
    manual: true,
    onSuccess: () => {},
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
              {t('Reset Your Password')}
            </h1>
            <p className='text-typography-base text-[15px] leading-[140%] tracking-[-0.3px]'>
              {t('We will send an SMS to your phone number for verification')}
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
              {t('Phone Number')}{' '}
              <span className='text-typography-error'>*</span>
            </h1>
            <Controller
              name='username'
              control={control}
              rules={{
                required: 'Phone number is required',
                validate: validateKhPhone,
              }}
              render={({
                field: { onChange, value, ...field },
                fieldState: { error },
              }) => {
                return (
                  <div
                    className={`flex w-full flex-col md:flex-row ${isCounting ? 'items-center' : 'items-start'} justify-between gap-3`}
                  >
                    <CusInput
                      onChange={(e) => {
                        let input = sanitizePhoneInput(e.target.value);
                        if (input.length > 10) {
                          input = input.slice(0, 10);
                        }

                        onChange(input);
                      }}
                      value={value}
                      leftElement={
                        <div className='flex items-center gap-2'>
                          <div className='relative h-[24px] w-[24px]'>
                            <Image src='/assets/khmer.svg' alt='' fill />
                          </div>
                          <span className='text-typography-base text-[15px] leading-[140%] font-normal tracking-[-0.3px]'>
                            +855
                          </span>
                        </div>
                      }
                      className='h-[48px] pl-[88px]'
                      type='text'
                      placeholder={
                        isSmUp ? t('Enter phone number') : t('Enter phone')
                      }
                      error={!!error}
                      errorMessage={error?.message}
                      {...field}
                    />
                    <ResendOtpButton
                      onResend={() => console.log('Send OTP API')}
                      onCountingChange={setIsCounting}
                    />
                  </div>
                );
              }}
            />
          </div>

          {/* Verification field */}
          <div className='space-y-1'>
            <h1 className='text-typography-base text-[15px] leading-[140%] font-normal tracking-[-0.3px]'>
              {t('Verification Code')}{' '}
              <span className='text-typography-error'>*</span>
            </h1>
            <Controller
              name='otp'
              control={control}
              rules={{ required: 'Verification Code is required' }}
              render={({ field, fieldState: { error } }) => (
                <CusInput
                  className='h-[48px]'
                  type={'text'}
                  placeholder={t('Enter Verification Code')}
                  error={!!error}
                  errorMessage={error?.message}
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

        {!isCounting && (
          <div className='flex items-center gap-3'>
            <p className='text-typography-base text-[15px] leading-[140%] font-normal tracking-[-0.3px]'>
              {t('Already have an account?')}
            </p>

            <button
              type='button'
              onClick={() => openSignIn()}
              className='text-primary cursor-pointer text-[15px] leading-[140%] font-medium tracking-[-0.3px] hover:underline'
            >
              {t('Sign In')}
            </button>
          </div>
        )}
      </form>
    </CusDialog>
  );
};

export default ResetPassword;
