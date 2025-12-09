'use client';

import useNavigateParam from 'hooks/useNavigateParam';

import { useRouter } from 'next/navigation';

import { useAuthContext } from '@/contexts/AuthContext';

const useAuth = () => {
  const router = useRouter();
  const { setStep } = useAuthContext();
  const { removeParam, setParam } = useNavigateParam();

  // ✅ Add ?auth=signin to the URL
  const openSignIn = () => {
    setParam('auth', 'signin');
    setStep(1);
    router.refresh();
  };

  // ✅ Remove ?auth=... from the URL
  const removeAuthParam = () => {
    removeParam('auth');
  };

  return { openSignIn, removeAuthParam };
};

export default useAuth;
