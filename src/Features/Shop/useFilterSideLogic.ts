'use client';

import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { IFilterForm } from './FilterSide';

export function useFilterSideLogic(categories: ICategory.ICategoryData[]) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const methods = useForm<IFilterForm>({
    defaultValues: {
      brands: [],
      shopCate: [],
      priceMin: 0,
      priceMax: 75,
    },
  });

  const { watch, setValue } = methods;

  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllShopCate, setShowAllShopCate] = useState(false);

  console.log('categories', categories);

  // ---------- Derived lists ----------
  const brandCate = useMemo(
    () => categories.filter((item) => item.productCategoryGroupId === 1),
    [categories]
  );

  const brands = useMemo(
    () => [{ id: 0, nameEn: 'Shop All' }, ...brandCate],
    [brandCate]
  );

  const allCate = useMemo(
    () => categories.filter((item) => item.productCategoryGroupId !== 1),
    [categories]
  );

  const shopCate = useMemo(
    () => [{ id: 0, nameEn: 'Shop All' }, ...allCate],
    [allCate]
  );

  // ---------- Watch values ----------
  const selectedBrands = watch('brands');
  const selectedShopCate = watch('shopCate');
  const priceMin = watch('priceMin');
  const priceMax = watch('priceMax');

  // ---------- Load from URL ----------
  useEffect(() => {
    const brandsFromParams = searchParams.getAll('brands').map(Number);
    const cateFromParams = searchParams.getAll('cate').map(Number);

    const min = Number(searchParams.get('min')) || 0;
    const max = Number(searchParams.get('max')) || 75;

    if (brandsFromParams.length > 0) setValue('brands', brandsFromParams);
    if (cateFromParams.length > 0) setValue('shopCate', cateFromParams);

    setValue('priceMin', min);
    setValue('priceMax', max);
  }, [searchParams, setValue]);

  // ---------- Sync to URL ----------
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    // Brands
    params.delete('brands');
    selectedBrands.forEach((b) => params.append('brands', String(b)));

    // Categories
    params.delete('cate');
    selectedShopCate.forEach((c) => params.append('cate', String(c)));

    // Price
    params.set('min', String(priceMin));
    params.set('max', String(priceMax));

    router.replace(`?${params.toString()}`, { scroll: false });
  }, [
    selectedBrands,
    selectedShopCate,
    priceMin,
    priceMax,
    router,
    searchParams,
  ]);

  const allBrandIds = useMemo(
    () => brandCate.map((item) => item.id),
    [brandCate]
  );

  const allShopCateIds = useMemo(
    () => allCate.map((item) => item.id),
    [allCate]
  );

  const isBrandAllSelected = selectedBrands.length === allBrandIds.length;
  const isShopCateAllSelected =
    selectedShopCate.length === allShopCateIds.length;

  // ---------- Toggle helpers ----------
  const toggleBrand = (id: number) => {
    if (id === 0) {
      // Shop All click → select ALL IDs
      setValue('brands', [...allBrandIds]);
      return;
    }

    let next = [...selectedBrands];

    if (next.includes(id)) {
      next = next.filter((b) => b !== id);
    } else {
      next.push(id);
    }

    setValue('brands', next);
    window.scrollTo({ top: 450, behavior: 'instant' });
  };

  const toggleShopCate = (id: number) => {
    if (id === 0) {
      setValue('shopCate', [...allShopCateIds]);
      return;
    }

    let next = [...selectedShopCate];

    if (next.includes(id)) {
      next = next.filter((c) => c !== id);
    } else {
      next.push(id);
    }

    setValue('shopCate', next);
    window.scrollTo({ top: 450, behavior: 'instant' });
  };

  const clearAll = () => {
    setValue('brands', []);
    setValue('shopCate', []);
    setValue('priceMin', 0);
    setValue('priceMax', 75);
    router.replace('?');
  };

  useEffect(() => {
    if (selectedBrands.length > 0) {
      setShowAllBrands(true);
    }
  }, [selectedBrands]);

  // ✅ Auto-show when at least one category is selected
  useEffect(() => {
    if (selectedShopCate.length > 0) {
      setShowAllShopCate(true);
    }
  }, [selectedShopCate]);

  return {
    methods,
    brands,
    shopCate,
    selectedBrands,
    selectedShopCate,
    priceMin,
    priceMax,
    toggleBrand,
    toggleShopCate,
    clearAll,
    showAllBrands,
    setShowAllBrands,
    showAllShopCate,
    setShowAllShopCate,
    isBrandAllSelected,
    isShopCateAllSelected,
  };
}
