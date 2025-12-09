'use client';

import { Eye, EyeSlash } from 'iconsax-reactjs';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Controller } from 'react-hook-form';

import ButtonBase from '@/components/Button/ButtonBase';
import CusInput from '@/components/CusInput/CusInput';
import ErrDialog from '@/components/Dialog/ErrorDialog';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';

import { usePasswordForm } from './usePasswordForm';

const Password = ({ refreshProfile }: { refreshProfile: () => void }) => {
  const t = useTranslations('profile');

  const {
    control,
    handleSubmit,
    onSubmit,
    loadingChangePassword,
    showPassword,
    showConPassword,
    showOldPassword,
    togglePassword,
    toggleConPassword,
    toggleOldPassword,
    error,
  } = usePasswordForm(refreshProfile);

  return (
    <>
      <ErrDialog ref={error} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='border-border flex flex-col gap-4 rounded-[16px] border p-4 md:gap-8 md:p-8'
      >
        <h1 className='text-typography-base text-[18px] leading-[140%] font-semibold'>
          {t('Change Password')}
        </h1>

        <div className='flex items-end justify-between gap-8'>
          <div className='flex w-full flex-col gap-6'>
            {/* Old Password */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-6'>
              <label className='text-typography-base w-[187px] shrink-0 text-[15px]'>
                {t('Old Password')}{' '}
                <span className='text-typography-error'>*</span>
              </label>
              <Controller
                name='oldPassword'
                control={control}
                rules={{ required: 'Old password is required' }}
                render={({ field, fieldState: { error } }) => (
                  <CusInput
                    rightElement={
                      <button
                        type='button'
                        onClick={toggleOldPassword}
                        className='hover:text-primary mr-4 flex cursor-pointer items-center text-gray-500 transition-colors'
                      >
                        {showOldPassword ? (
                          <EyeSlash size='20' variant='Outline' />
                        ) : (
                          <Eye size='20' variant='Outline' />
                        )}
                      </button>
                    }
                    className='h-[48px] flex-1'
                    type={showOldPassword ? 'text' : 'password'}
                    placeholder={t('Enter your old password') + '...'}
                    error={!!error}
                    errorMessage={error?.message}
                    {...field}
                  />
                )}
              />
            </div>

            {/* New Password */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-6'>
              <label className='text-typography-base w-[187px] shrink-0 text-[15px]'>
                {t('Create New Password')}
                <span className='text-typography-error'>*</span>
              </label>
              <Controller
                name='newPassword'
                control={control}
                rules={{ required: 'New password is required' }}
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
                    className='h-[48px] flex-1'
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t('Enter your new password') + '...'}
                    error={!!error}
                    errorMessage={error?.message}
                    {...field}
                  />
                )}
              />
            </div>

            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-6'>
              <label className='text-typography-base w-[187px] shrink-0 text-[15px]'>
                {t('Confirm New Password')}
                <span className='text-typography-error'>*</span>
              </label>
              <Controller
                name='conPassword'
                control={control}
                rules={{ required: 'New password is required' }}
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
                    className='h-[48px] flex-1'
                    type={showConPassword ? 'text' : 'password'}
                    placeholder={t('Enter your new password') + '...'}
                    error={!!error}
                    errorMessage={error?.message}
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          <div className='hidden justify-end lg:flex'>
            <ButtonBase
              type='submit'
              className='h-[48px] min-w-[146px] rounded-[12px] px-4'
            >
              {loadingChangePassword ? (
                <LoadingSpinner size={18} />
              ) : (
                t('Update')
              )}
            </ButtonBase>
          </div>
        </div>

        <div className='flex justify-end lg:hidden'>
          <ButtonBase
            type='submit'
            className='h-[48px] min-w-[146px] rounded-[12px] px-4'
          >
            {loadingChangePassword ? <LoadingSpinner size={18} /> : t('Update')}
          </ButtonBase>
        </div>
      </form>
    </>
  );
};

export default Password;
