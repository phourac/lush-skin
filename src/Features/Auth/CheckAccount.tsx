'use client';

import { useRequest } from 'ahooks';
import AUTH_API from 'api/Auth';
import { useBreakPoints } from 'hooks/useBreakPoints';
import useNavigateParam from 'hooks/useNavigateParam';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { useAuthContext } from '@/contexts/AuthContext';

import ButtonBase from '@/components/Button/ButtonBase';
import CusInput from '@/components/CusInput/CusInput';
import CusDialog from '@/components/Dialog/CusDialog';
import ErrDialog, { IErrDialogRef } from '@/components/Dialog/ErrorDialog';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';

import { sanitizePhoneInput, validateKhPhone } from '@/utils/validate-utils';

import useAuth from './useAuth';

interface ICheckSubmit {
  phone: string;
}

const CheckAccount = ({
  setAccounts,
  setGetPhone,
}: {
  setAccounts: React.Dispatch<React.SetStateAction<IAuth.ICheck | undefined>>;
  setGetPhone: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const error = useRef<IErrDialogRef>(null);
  const { setStep } = useAuthContext();
  const { setParam } = useNavigateParam();
  const { removeAuthParam } = useAuth();
  const { isSmUp } = useBreakPoints();
  const t = useTranslations('auth');

  const searchParams = useSearchParams();
  const isOpen = searchParams.get('auth') === 'signin';
  const { handleSubmit, control } = useForm<ICheckSubmit>({
    defaultValues: {
      phone: '',
    },
  });

  const { run: runCheck, loading: loadingCheck } = useRequest(AUTH_API.check, {
    manual: true,
    onSuccess: (data) => {
      setAccounts(data);
      if (data.data.length === 0) {
        setParam('auth', 'signup');
      } else {
        setStep(2);
      }
    },
    onError: (err) => {
      error.current?.open(err);
    },
  });

  const onSubmit = (data: ICheckSubmit) => {
    setGetPhone(data.phone);
    runCheck({ username: data.phone });
  };

  const onClose = () => {
    removeAuthParam();
    setStep(0);
  };
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
        height='auto'
        className='relative w-[534px] rounded-2xl p-6'
      >
        {/* Close button (top-right) */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <button
            type='button'
            onClick={onClose}
            className='absolute top-6 right-6 cursor-pointer transition-opacity hover:opacity-70'
          >
            <Image
              src='/assets/cancel.svg'
              alt='Close'
              width={20}
              height={20}
            />
          </button>

          {/* Dialog content */}
          <div className='flex flex-col items-center gap-6 pt-8'>
            <Image
              src='/images/logo-navbar.svg'
              height={40}
              width={183}
              alt='Logo'
            />

            <h1 className='text-typography-base text-[24px] leading-[130%] font-semibold'>
              Welcome to Lush skin
            </h1>

            <div className='w-full space-y-1 rounded-[12px] bg-white px-4 pt-4 pb-5'>
              <h1 className='text-typography-base text-[15px] leading-[140%] font-normal tracking-[-0.3px]'>
                Phone Number <span className='text-typography-error'>*</span>
              </h1>
              <Controller
                name='phone'
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
                  );
                }}
              />
            </div>

            <ButtonBase type='submit' className='h-[48px] w-full rounded-full'>
              {loadingCheck ? <LoadingSpinner /> : 'Continue with phone number'}
            </ButtonBase>
          </div>
        </form>
      </CusDialog>
    </>
  );
};

export default CheckAccount;
