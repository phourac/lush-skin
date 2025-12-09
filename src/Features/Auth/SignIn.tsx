'use client';

import { useRequest } from 'ahooks';
import AUTH_API from 'api/Auth';
import { useRouter } from 'hooks/navigation';
import { useBreakPoints } from 'hooks/useBreakPoints';
import useNavigateParam from 'hooks/useNavigateParam';
import { Eye, EyeSlash } from 'iconsax-reactjs';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

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

interface ISignInSubmit {
  uuid: string;
  username: string;
  password: string;
  showPassword?: boolean;
}

const SignIn = ({
  selectedAcc,
  setAccounts,
}: {
  selectedAcc: IAuth.ICheckData | undefined;
  setAccounts: React.Dispatch<React.SetStateAction<IAuth.ICheck | undefined>>;
}) => {
  const error = useRef<IErrDialogRef>(null);

  const searchParams = useSearchParams();
  // const isOpen = searchParams.get('auth') === 'signin';
  const isOpen = searchParams.get('auth') === 'signin';
  const { isSmUp } = useBreakPoints();

  const t = useTranslations('auth');
  const router = useRouter();

  const { removeAuthParam } = useAuth();

  const { setParam } = useNavigateParam();

  const { login } = useAuthContext();

  // const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, control, setValue, getValues } = useForm<ISignInSubmit>(
    {
      defaultValues: {
        username: '',
        password: '',
        showPassword: false,
      },
    }
  );

  const { run: runCheck, loading: loadingCheck } = useRequest(AUTH_API.check, {
    manual: true,
    onSuccess: (data) => {
      if (data.data.length === 1) {
        // setParam('auth', 'signup');
        runSignIn({
          password: getValues('password'),
          username: getValues('username'),
          uuid: data.data[0].uuid,
        });
      } else if (data.data.length > 1) {
        setAccounts(data);
      } else {
        setParam('auth', 'signup');
      }
    },
    onError: (err) => {
      error.current?.open(err);
    },
  });

  const {
    run: runSignIn,
    loading: loadingSigIn,
    // error: errorSignIn,
  } = useRequest(AUTH_API.signIn, {
    manual: true,
    onSuccess: () => {
      login();
      removeAuthParam();
      router.refresh();
    },
    onError: (err) => {
      error.current?.open(err);
    },
  });

  const showPassword = useWatch({ control, name: 'showPassword' });

  const togglePassword = () => {
    setValue('showPassword', !showPassword);
  };

  const onSubmit = (data: ISignInSubmit) => {
    runCheck({ username: data.username });
  };

  const onClose = () => {
    removeAuthParam();
  };

  useEffect(() => {
    if (selectedAcc) {
      setValue(
        'username',
        selectedAcc?.username || selectedAcc?.userInfo.phone
      );
    }
  }, [selectedAcc, setValue]);

  useEffect(() => {
    if (selectedAcc) {
      runSignIn({
        password: getValues('password'),
        username: selectedAcc.username,
        uuid: selectedAcc.uuid,
      });
    }
  }, [selectedAcc, runSignIn, getValues]);
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
        className='relative w-[534px] rounded-2xl px-4 py-6 md:px-6'
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-start gap-6'
        >
          <div className='flex w-full items-center justify-between'>
            <h1 className='text-typography-base text-[18px] leading-[140%] font-semibold'>
              {t('Login to your account')}
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

          <div className='w-full space-y-6 rounded-[12px] bg-white px-3 pt-4 pb-5 md:px-4'>
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

            <div className='space-y-1'>
              <h1 className='text-typography-base text-[15px] leading-[140%] font-normal tracking-[-0.3px]'>
                {t('Password')} <span className='text-typography-error'>*</span>
              </h1>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field, formState: { errors } }) => {
                  return (
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
                      error={!!errors.password}
                      {...field}
                    />
                  );
                }}
              />
            </div>

            <button
              type='button'
              className='text-primary cursor-pointer text-[15px] leading-[140%] font-medium tracking-[-0.3px]'
            >
              {t('Forgot password?')}
            </button>
          </div>

          <ButtonBase className='h-[48px] w-full rounded-full' type='submit'>
            {loadingCheck || loadingSigIn ? <LoadingSpinner /> : t('Login')}
          </ButtonBase>

          <div className='flex items-center gap-3'>
            <p className='text-typography-base text-[15px] leading-[140%] font-normal tracking-[-0.3px]'>
              {t('Don’t have an account yet?')}
            </p>

            <button
              type='button'
              onClick={() => setParam('auth', 'signup')}
              className='text-primary cursor-pointer text-[15px] leading-[140%] font-medium tracking-[-0.3px] hover:underline'
            >
              {t('Register Now')}
            </button>
          </div>
        </form>
      </CusDialog>
    </>
  );
};

export default SignIn;
