'use client';

import React from 'react';
import { AdminSearchInput } from './search-input';
import { IFilters } from './admin-product-filter';

interface Props {
  isClearInput: boolean;
  disableClearInput: (value: boolean) => void;
  isProductOrItemIdDisabled: boolean;
  filters: IFilters;
  updateFilters: (value: keyof IFilters, data: any) => void;
}

export const AdminProdFilter1stBlock: React.FC<Props> = ({
  isClearInput,
  disableClearInput,
  isProductOrItemIdDisabled,
  filters,
  updateFilters,
}) => {
  const isProdDisabled = !!filters.productItemId;
  const isProdItemDisabled = !!filters.productId;

  return (
    <div className="flex items-center justify-between gap-3 p-2 w-full mb-3 border border-gray-300">
      {/* Поиск по id товара */}
      <AdminSearchInput
        searchQuery={filters.productId}
        setSearchQuery={(value) => updateFilters('productId', value)}
        title="ID товара"
        isClearInput={isClearInput}
        disableClearInput={disableClearInput}
        className="w-full mb-3"
        inputClassName="w-full h-[38px] rounded-[5px] border border-gray-300 bg-white pl-8 pr-3"
        isDisabled={isProductOrItemIdDisabled || isProdDisabled}
      />

      {/* Поиск по артикулу товара (productItemId) */}
      <AdminSearchInput
        searchQuery={filters.productItemId}
        setSearchQuery={(value) => updateFilters('productItemId', value)}
        title="Артикул товара"
        isClearInput={isClearInput}
        disableClearInput={disableClearInput}
        className="w-full mb-3"
        inputClassName="w-full h-[38px] rounded-[5px] border border-gray-300 bg-white pl-8 pr-3"
        isDisabled={isProductOrItemIdDisabled || isProdItemDisabled}
      />
    </div>
  );
};
