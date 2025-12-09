'use client';

import { useRequest } from 'ahooks';
import AUTH_API from 'api/Auth';
import { useRouter } from 'hooks/navigation';
import { useForm } from 'react-hook-form';

export default function useSignUp() {
  const router = useRouter();

  // Initialize form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
    },
  });

  // Handle signup request
  const {
    run: runSignUp,
    loading: loadingSigUp,
    error: errorSignUp,
  } = useRequest(AUTH_API.signUp, {
    manual: true,
    onSuccess: () => {
      alert('Account created successfully! Please sign in.');
      router.push('/signin');
    },
  });

  // Submit handler
  const onSubmit = (data: {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
  }) => runSignUp(data);

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    loadingSigUp,
    errorSignUp,
  };
}
