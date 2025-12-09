'use client';

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getPersistedState, persistState } from '@/utils/persist-util';

interface Session {
  username: string;
  imageUrl: string;
  firstname: string;
  lastname: string;
  isLogin: boolean;
  userId: string;
  accessToken: string;
  refreshToken: string;
}

interface AuthContextType {
  login: () => void;
  logout: () => void;
  loading: boolean;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isLogin: boolean;
  session: Session | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  sessioon: initialSession,
  handleDeleteSes,
}: {
  children: ReactNode;
  sessioon: Session | null;
  handleDeleteSes(): Promise<void>;
}) => {
  const [loading] = useState(false);

  // store session data
  const [session, setSession] = useState<Session | null>(initialSession);

  // isLogin = session.isLogin or false
  const [isLogin, setIsLogin] = useState<boolean>(
    initialSession?.isLogin ?? false
  );

  const [step, setStep] = useState(1);

  // ------------------------------
  // ⭐ LOGIN → set session directly
  // ------------------------------
  const login = () => {
    setIsLogin(true);
  };

  // ------------------------------
  // ⭐ LOGOUT → clear session
  // ------------------------------
  const logout = () => {
    setSession(null);
    setIsLogin(false);
    localStorage.removeItem('AUTH_VERSION');
  };

  useEffect(() => {
    const CURRENT_VERSION = process.env.NEXT_PUBLIC_AUTH_STORAGE_VERSION;

    const storedVersion = getPersistedState('AUTH_VERSION');

    if (storedVersion !== CURRENT_VERSION) {
      console.warn('Auth version changed. Clearing session...');

      handleDeleteSes();
      logout();
      persistState('AUTH_VERSION', CURRENT_VERSION || '0');
    }
  }, [handleDeleteSes]);

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        loading,
        step,
        setStep,
        isLogin,
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook
export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
  return ctx;
}
