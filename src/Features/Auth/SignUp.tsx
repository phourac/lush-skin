'use client';

import { useRequest } from 'ahooks';
import AUTH_API from 'api/Auth';
import { useBreakPoints } from 'hooks/useBreakPoints';
import { Eye, EyeSlash } from 'iconsax-reactjs';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import ResendOtpButton from '@/components/AuthCom/ResendOtpButton';
import ButtonBase from '@/components/Button/ButtonBase';
import CusInput from '@/components/CusInput/CusInput';
import CusDialog from '@/components/Dialog/CusDialog';
import ErrDialog, { IErrDialogRef } from '@/components/Dialog/ErrorDialog';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';

import { sanitizePhoneInput, validateKhPhone } from '@/utils/validate-utils';

import useAuth from './useAuth';

interface ISignUpInSubmit {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  showPassword?: boolean;
  conPassword?: string;
  showConPassword?: boolean;
  otp: string;
}

const SignUp = ({ getPhone }: { getPhone: string }) => {
  const error = useRef<IErrDialogRef>(null);

  const searchParams = useSearchParams();
  const isOpen = searchParams.get('auth') === 'signup';
  const [isCounting, setIsCounting] = useState(false);

  const { isSmUp } = useBreakPoints();

  const t = useTranslations('auth');

  // const router = useRouter();

  const { handleSubmit, control, setValue } = useForm<ISignUpInSubmit>({
    defaultValues: {
      username: '',
      password: '',
      conPassword: '',
      showConPassword: false,
      showPassword: false,
      firstname: '',
      lastname: '',
    },
  });

  const showPassword = useWatch({ control, name: 'showPassword' });
  const showConPassword = useWatch({ control, name: 'showConPassword' });

  const { removeAuthParam, openSignIn } = useAuth();

  const togglePassword = () => {
    setValue('showPassword', !showPassword);
  };
  const toggleConPassword = () => {
    setValue('showConPassword', !showConPassword);
  };

  const {
    run: runSignUp,
    loading: loadingSigUp,
    // error: errorSignUp,
  } = useRequest(AUTH_API.signUp, {
    manual: true,
    onSuccess: () => {
      openSignIn();
      // alert('Account created successfully! Please sign in.');
      // router.push('/signin');
    },
    onError: (err) => {
      error.current?.open(err);
    },
  });

  const onSubmit = (data: ISignUpInSubmit) => {
    runSignUp({ ...data, firstname: data.username, lastname: data.username });
  };
  const onClose = () => {
    removeAuthParam();
  };

  useEffect(() => {
    if (getPhone) {
      setValue('username', getPhone);
    }
  }, [getPhone, setValue]);

  return (
    <>
      <ErrDialog ref={error} />

      <CusDialog
        isOpen={isOpen}
        onClose={() => {}}
        title=''
        buttonText='Ok'
        loading={false}
        direction='bottom'
        className='relative w-[534px] rounded-2xl px-4 py-0 md:px-6'
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='relative flex h-[85vh] flex-col'
        >
          {/* Header with title and close button */}
          <div className='bg-paper sticky top-0 z-20 flex w-full items-center justify-between pt-6 pb-4'>
            <h1 className='text-typography-base text-[18px] leading-[140%] font-semibold'>
              {t('Create an Account')}
            </h1>
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

            {/* Password field */}
            <div className='space-y-1'>
              <h1 className='text-typography-base text-[15px] leading-[140%] font-normal tracking-[-0.3px]'>
                {t('Create a Password')}
                <span className='text-typography-error'>*</span>
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

            <button
              type='button'
              className='text-primary cursor-pointer text-[15px] leading-[140%] font-medium tracking-[-0.3px]'
            >
              {t('Forgot password?')}
            </button>
          </div>

          {/* Submit button */}
          {/* ✅ Sticky Footer */}
          <div className='bg-paper sticky bottom-0 z-20 pt-4 pb-6'>
            <ButtonBase className='h-[48px] w-full rounded-full' type='submit'>
              {loadingSigUp ? <LoadingSpinner /> : t('Continue')}
            </ButtonBase>

            <div className='mt-4 flex items-center justify-center gap-3'>
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
          </div>
        </form>
      </CusDialog>
    </>
  );
};

export default SignUp;
