'use client';

import { useRequest } from 'ahooks';
import PROFILE_API from 'api/Profile';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { IErrDialogRef } from '@/components/Dialog/ErrorDialog';

interface ProfileFormValues {
  image: File | null;
  imagePreview: string | null;
}

export function useProfileImage(
  getProfile: IProfile.IProfileRes | undefined,
  refreshProfile: () => void
) {
  const error = useRef<IErrDialogRef>(null);

  const { control, handleSubmit, setValue, watch } = useForm<ProfileFormValues>(
    {
      defaultValues: {
        image: null,
        imagePreview: null,
      },
    }
  );

  const imagePreview = watch('imagePreview');
  const imageFile = watch('image');

  const { run: runUpdateProfile, loading: loadingUpdateProfile } = useRequest(
    PROFILE_API.updateProfile,
    {
      manual: true,
      onSuccess: () => {
        refreshProfile();
      },
      onError: (err) => {
        error.current?.open(err);
      },
    }
  );

  const onSubmit = (data: ProfileFormValues) => {
    if (data.image) {
      runUpdateProfile({ imageFile: data.image });
    }
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0] ?? null;
    onChange(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('imagePreview', reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setValue('imagePreview', null);
    }
  };

  const handleRemove = (onChange: (file: File | null) => void) => {
    onChange(null);
    setValue('imagePreview', null);
  };

  useEffect(() => {
    if (getProfile?.data) {
      setValue('imagePreview', getProfile.data.userInfo.imageUrl);
    }
  }, [getProfile, setValue]);

  return {
    error,

    control,
    handleSubmit,
    onSubmit,
    imagePreview,
    imageFile,
    handleImageChange,
    handleRemove,
    loadingUpdateProfile,
  };
}
