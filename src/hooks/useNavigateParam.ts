'use client';

// ✅ from your intl setup
import { useSearchParams } from 'next/navigation';

import { usePathname, useRouter } from './navigation';

// next-intl doesn't provide this directly

const useNavigateParam = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ✅ Add or update a query parameter
  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl);
  };

  // ✅ Remove a query parameter
  const removeParam = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.replace(newUrl);
  };

  // ✅ Add or remove multiple query parameters at once
  const setParams = (entries: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(entries).forEach(([key, value]) => {
      if (value === null) params.delete(key);
      else params.set(key, value);
    });
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.replace(newUrl);
  };

  return { setParam, removeParam, setParams };
};

export default useNavigateParam;
