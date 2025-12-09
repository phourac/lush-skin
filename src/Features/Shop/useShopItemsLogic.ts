'use client';

import { useRouter } from 'hooks/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useAppContext } from '@/contexts/AppClientContext';

export const SORT_OPTIONS = [
  { id: 'popular', name: 'Popularity' },
  { id: 'new', name: 'Newest' },
  { id: 'low', name: 'Price: Low to High' },
  { id: 'hight', name: 'Price: High to Low' },
];

export function useShopItemsLogic() {
  const { dataCate } = useAppContext();
  const categories = dataCate?.data || [];

  console.log('categoriesData', categories);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [showFilter, setShowFilter] = useState(false);

  const currentSortOption = useMemo(() => {
    const id = searchParams.get('sort') || 'popular';
    return SORT_OPTIONS.find((o) => o.id === id) || SORT_OPTIONS[0];
  }, [searchParams]);

  const queryParam = searchParams.get('query');

  const handleSortChange = useCallback(
    (value: string) => {
      const selected =
        SORT_OPTIONS.find((o) => o.name === value) || SORT_OPTIONS[0];
      const params = new URLSearchParams(searchParams.toString());
      params.set('sort', selected.id);

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Scroll lock when drawer is visible
  useEffect(() => {
    if (showFilter) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = parseInt(document.body.style.top || '0', 10) * -1;

      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';

      window.scrollTo(0, scrollY);
    }
  }, [showFilter]);

  return {
    categories,
    currentSortOption,
    queryParam,
    showFilter,
    setShowFilter,
    handleSortChange,
  };
}
