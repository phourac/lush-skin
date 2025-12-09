'use client';

import { useTranslations } from 'next-intl';
import React from 'react';
import { Controller } from 'react-hook-form';

import Image from 'next/image';

import Avatar from '@/components/Avatar';
import ButtonBase from '@/components/Button/ButtonBase';
import ErrDialog from '@/components/Dialog/ErrorDialog';
import LoadingSpinner from '@/components/Loading/LoadingSpinner';

import { colors, getTextColor } from '@/utils/avatar-utils';

import { useProfileImage } from './useProfileImage';

const Profile = ({
  getProfile,
  refreshProfile,
}: {
  getProfile: IProfile.IProfileRes | undefined;
  refreshProfile: () => void;
}) => {
  const t = useTranslations('profile');

  const {
    control,
    handleSubmit,
    onSubmit,
    imagePreview,
    // imageFile,
    handleImageChange,
    handleRemove,
    loadingUpdateProfile,
    error,
  } = useProfileImage(getProfile, refreshProfile);

  const bgColor = colors[1];
  const textColor = getTextColor(bgColor);
  const firstLetter =
    getProfile?.data.userInfo.firstname.charAt(0).toUpperCase() || '';

  return (
    <>
      <ErrDialog ref={error} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='border-border flex flex-col space-y-4 rounded-[16px] border-[1px] p-4 md:p-8'
      >
        <h1 className='text-typography-base text-[18px] leading-[140%] font-semibold'>
          {t('Profile Image')}
        </h1>

        <div className='flex w-full items-center justify-between'>
          <Controller
            name='image'
            control={control}
            render={({ field: { onChange } }) => (
              <div className='flex items-center gap-4'>
                {/* Avatar / Preview */}
                {imagePreview ? (
                  <div className='border-border relative box-border flex h-[70px] w-[70px] items-center justify-center overflow-hidden rounded-full border bg-white p-[1px]'>
                    <Image
                      src={imagePreview}
                      alt='Preview'
                      fill
                      className='object-cover'
                    />
                  </div>
                ) : (
                  <Avatar {...{ bgColor, firstLetter, textColor, size: 70 }} />
                )}

                {/* Upload */}
                <label className='flex cursor-pointer items-center gap-2 text-[15px] font-medium'>
                  <div className='relative h-[16px] w-[16px]'>
                    <Image src='/assets/upload.svg' alt='Upload' fill />
                  </div>
                  {t('Upload')}
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => handleImageChange(e, onChange)}
                  />
                </label>

                {/* Remove */}
                {imagePreview && (
                  <button
                    type='button'
                    onClick={() => handleRemove(onChange)}
                    className='flex cursor-pointer items-center gap-2 text-[15px] font-medium'
                  >
                    <div className='relative h-[16px] w-[16px]'>
                      <Image src='/assets/delete.svg' alt='Delete' fill />
                    </div>
                    {t('Remove')}
                  </button>
                )}
              </div>
            )}
          />

          <ButtonBase
            type='submit'
            className='hidden h-[48px] min-w-[146px] rounded-[12px] px-4 lg:block'
          >
            {loadingUpdateProfile ? <LoadingSpinner size={18} /> : t('Update')}
          </ButtonBase>
        </div>

        <ButtonBase
          type='submit'
          className='block h-[48px] min-w-[146px] rounded-[12px] px-4 lg:hidden'
        >
          {loadingUpdateProfile ? <LoadingSpinner size={18} /> : t('Update')}
        </ButtonBase>
      </form>
    </>
  );
};

export default Profile;
