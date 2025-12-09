'use client';

import { useRequest } from 'ahooks';
import PROFILE_API from 'api/Profile';
import moment from 'moment';
import { useCallback, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { IErrDialogRef } from '@/components/Dialog/ErrorDialog';

interface IPersonalForm {
  firstname: string;
  lastname: string;
  gender: string;
  day: string;
  month: string;
  year: string;
  dob: string;
}

export function usePersonalForm(getProfile: any, refreshProfile: () => void) {
  const error = useRef<IErrDialogRef>(null);

  const form = useForm<IPersonalForm>({
    defaultValues: {
      firstname: '',
      gender: '',
      day: '',
      month: '',
      year: '',
    },
  });

  const { control, handleSubmit, setValue } = form;

  /** -----------------------------
   * UPDATE PROFILE API
   * ----------------------------- */
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

  /** -----------------------------
   * SUBMIT HANDLER
   * ----------------------------- */
  const onSubmit = useCallback(
    (data: IPersonalForm) => {
      const dobIso =
        data.year && data.month && data.day
          ? moment(
              `${data.year}-${data.month}-${data.day}`,
              'YYYY-M-D'
            ).toISOString()
          : '';

      runUpdateProfile({
        firstname: data.firstname,
        lastname: data.lastname,
        gender: data.gender,
        dob: dobIso,
      });
    },
    [runUpdateProfile]
  );

  /** -----------------------------
   * SET FORM FROM PROFILE
   * ----------------------------- */
  useEffect(() => {
    if (!getProfile) return;

    const info = getProfile?.data?.userInfo;

    setValue('firstname', info.firstname ?? '');
    setValue('lastname', info.lastname ?? '');
    setValue('gender', info.gender ?? '');

    const dob = info.dob || '';
    const [year, month, day] = dob.split('-');

    setValue('day', day ?? '');
    setValue('month', month?.replace(/^0/, '') ?? '');
    setValue('year', year ?? '');
  }, [getProfile, setValue]);

  return {
    error,

    control,
    handleSubmit,
    onSubmit,
    loadingUpdateProfile,
    setValue,
  };
}
