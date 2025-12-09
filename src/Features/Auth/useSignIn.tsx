'use client';

import { useRequest } from 'ahooks';
import AUTH_API from 'api/Auth';
import { useRouter } from 'hooks/navigation';
import { useForm } from 'react-hook-form';

import { useAuthContext } from '@/contexts/AuthContext';

interface ISignInSubmit {
  uuid: string;
  username: string;
  password: string;
  showPassword: boolean;
}
export default function useSignIn() {
  const router = useRouter();

  const { login } = useAuthContext();

  // Initialize form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInSubmit>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // Handle sign-in request
  const {
    run: runSignIn,
    loading: loadingSigIn,
    error: errorSignIn,
  } = useRequest(AUTH_API.signIn, {
    manual: true,
    onSuccess: () => {
      login();
      router.replace('/');
      router.refresh();
    },
  });

  // Submit handler
  const onSubmit = (data: {
    username: string;
    password: string;
    uuid: string;
  }) => runSignIn(data);

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
    loadingSigIn,
    errorSignIn,
  };
}
