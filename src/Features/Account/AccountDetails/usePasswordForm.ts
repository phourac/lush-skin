'use client';

import { useRequest } from 'ahooks';
import PROFILE_API from 'api/Profile';
import { useCallback, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';

import { IErrDialogRef } from '@/components/Dialog/ErrorDialog';

interface IPasswordForm {
  oldPassword: string;
  showOldPassword: boolean;

  newPassword: string;
  showPassword: boolean;

  conPassword: string;
  showConPassword: boolean;
}

export function usePasswordForm(refreshProfile: () => void) {
  const error = useRef<IErrDialogRef>(null);

  const form = useForm<IPasswordForm>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      conPassword: '',

      showPassword: false,
      showConPassword: false,
      showOldPassword: false,
    },
  });

  const { control, handleSubmit, setValue } = form;

  /** Password visibility watches */
  const showPassword = useWatch({ control, name: 'showPassword' });
  const showConPassword = useWatch({ control, name: 'showConPassword' });
  const showOldPassword = useWatch({ control, name: 'showOldPassword' });

  /** Toggles */
  const togglePassword = () => setValue('showPassword', !showPassword);
  const toggleConPassword = () => setValue('showConPassword', !showConPassword);
  const toggleOldPassword = () => setValue('showOldPassword', !showOldPassword);

  /** Change password API */
  const { run: runChangePass, loading: loadingChangePassword } = useRequest(
    PROFILE_API.changePass,
    {
      manual: true,
      onSuccess: () => {
        refreshProfile();
        toast.success('Password changed successfully');
      },
      onError: (err) => {
        error.current?.open(err);
      },
    }
  );

  /** Submit logic */
  const onSubmit = useCallback(
    (data: IPasswordForm) => {
      runChangePass({
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      });
    },
    [runChangePass]
  );

  return {
    error,

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
  };
}
