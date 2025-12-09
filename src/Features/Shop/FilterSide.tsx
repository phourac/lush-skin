'use client';

import React from 'react';
import { Controller, FormProvider } from 'react-hook-form';

import Image from 'next/image';

import CheckboxCustom from '@/components/Button/CheckboxCustom';

import SildePrice from './SildePrice';
import { useFilterSideLogic } from './useFilterSideLogic';

export interface IFilterForm {
  brands: number[]; // ✅ now use IDs
  shopCate: number[];
  priceMin: number;
  priceMax: number;
}

const FilterSide = ({
  categories,
}: {
  categories: ICategory.ICategoryData[];
}) => {
  const {
    methods,
    brands,
    shopCate,
    selectedBrands,
    selectedShopCate,
    toggleBrand,
    toggleShopCate,
    clearAll,
    showAllBrands,
    setShowAllBrands,
    showAllShopCate,
    setShowAllShopCate,
    isShopCateAllSelected,
    isBrandAllSelected,
  } = useFilterSideLogic(categories);

  return (
    <FormProvider {...methods}>
      <div className='flex w-[285px] flex-col gap-[8px] bg-white'>
        {/* Shop Category */}
        {shopCate.length > 0 && (
          <div>
            <div className='flex items-center justify-between py-4'>
              <h2 className='text-typography-base text-[18px] font-semibold'>
                Shop all Category
              </h2>
              {selectedShopCate.length > 0 && (
                <button
                  type='button'
                  onClick={() => {
                    methods.setValue('shopCate', []);
                    window.scrollTo({ top: 450, behavior: 'instant' });
                  }}
                  className='text-primary text-[15px] hover:underline'
                >
                  Unselect All
                </button>
              )}
            </div>

            <Controller
              control={methods.control}
              name='shopCate'
              render={() => (
                <div className='flex flex-col items-start'>
                  {shopCate
                    .slice(0, showAllShopCate ? shopCate.length : 8)
                    .map((item, index) => {
                      const isChecked =
                        item.id === 0
                          ? isShopCateAllSelected
                          : selectedShopCate.includes(item.id);
                      return (
                        <CheckboxCustom
                          key={index}
                          checked={isChecked}
                          onChange={() => toggleShopCate(item.id)}
                          label={item.nameEn}
                        />
                      );
                    })}
                  {shopCate.length > 7 && (
                    <button
                      onClick={() => setShowAllShopCate(!showAllShopCate)}
                      type='button'
                      className='text-typography-muted flex cursor-pointer items-center gap-[10px] py-[10px] text-[15px] font-medium underline'
                    >
                      {showAllShopCate ? 'Show less' : 'Show more'}
                      <Image
                        src={'/assets/arrow-down.svg'}
                        alt=''
                        width={0}
                        height={0}
                        className='h-auto w-auto'
                      />
                    </button>
                  )}
                </div>
              )}
            />
          </div>
        )}

        {/* Brands */}
        {brands.length > 0 && (
          <div>
            <div className='flex items-center justify-between py-4'>
              <h2 className='text-typography-base text-[18px] font-semibold'>
                Brands
              </h2>
              {selectedBrands.length > 0 && (
                <button
                  type='button'
                  onClick={() => {
                    methods.setValue('brands', []);
                    window.scrollTo({ top: 450, behavior: 'instant' });
                  }}
                  className='text-primary text-[15px] hover:underline'
                >
                  Unselect All
                </button>
              )}
            </div>

            <Controller
              control={methods.control}
              name='brands'
              render={() => (
                <div className='flex flex-col items-start'>
                  {brands
                    .slice(0, showAllBrands ? brands.length : 8)
                    .map((item, index) => {
                      const isChecked =
                        item.id === 0
                          ? isBrandAllSelected
                          : selectedBrands.includes(item.id);
                      return (
                        <CheckboxCustom
                          key={index}
                          checked={isChecked}
                          onChange={() => toggleBrand(item.id)}
                          label={item.nameEn}
                        />
                      );
                    })}
                  {brands.length > 7 && (
                    <button
                      onClick={() => setShowAllBrands(!showAllBrands)}
                      type='button'
                      className='text-typography-muted flex cursor-pointer items-center gap-[10px] py-[10px] text-[15px] font-medium underline'
                    >
                      {showAllBrands ? 'Show less' : 'Show more'}
                      <Image
                        src={'/assets/arrow-down.svg'}
                        alt=''
                        width={0}
                        height={0}
                        className='h-auto w-auto'
                      />
                    </button>
                  )}
                </div>
              )}
            />
          </div>
        )}

        {/* Price */}
        <div>
          <div className='py-4'>
            <h2 className='text-typography-base text-[18px] font-semibold'>
              Price
            </h2>
          </div>
          <SildePrice />
        </div>

        {/* Clear All */}
        <button
          type='button'
          onClick={clearAll}
          className='bg-primary-light text-primary cursor-pointer rounded-[8px] px-4 py-2 text-[15px] font-medium tracking-[-2%] underline'
        >
          Clear All
        </button>
      </div>
    </FormProvider>
  );
};

export default FilterSide;
