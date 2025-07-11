'use client';

import { useAdminSelectsOptions } from '@/hooks';
import { IFilters } from './admin-product-filter';
import { AdminProductSelect } from './admin-product-select';
import { AdminSearchInput } from './search-input';
import { useEffect } from 'react';

interface Props {
  isFiltersDisabled: boolean;
  isClearInput: boolean;
  disableClearInput: (value: boolean) => void;
  filters: IFilters;
  updateFilters: (value: keyof IFilters, data: any) => void;
  filtersLoaded: (value: boolean, index: number) => void;
}

export const AdminProdFilter2ndBlock: React.FC<Props> = ({
  isFiltersDisabled,
  isClearInput,
  disableClearInput,
  filters,
  updateFilters,
  filtersLoaded,
}) => {
  const {
    prodManufLoading,
    prodIngLoading,
    prodCatLoading,
    manufOptions,
    ingredOptions,
    categOptions,
  } = useAdminSelectsOptions();

  useEffect(() => {
    if (!prodManufLoading || !prodIngLoading || !prodCatLoading) {
      filtersLoaded(true, 0);
    } else {
      filtersLoaded(false, 0);
    }
  }, [prodManufLoading, prodIngLoading, prodCatLoading]);

  return (
    <>
      <div className="flex items-center justify-between gap-3 p-2 w-full mb-3 border border-gray-300 ">
        {/* Поиск по названию */}
        <AdminSearchInput
          searchQuery={filters.productName}
          setSearchQuery={(value) => updateFilters('productName', value)}
          title="Название товара"
          isClearInput={isClearInput}
          disableClearInput={disableClearInput}
          className="w-full"
          inputClassName="w-full h-[38px] rounded-[5px] border border-gray-300 bg-white pl-8 pr-3"
          isDisabled={isFiltersDisabled}
        />

        {/* Селект по производителям */}
        <AdminProductSelect
          name="productManufacturer"
          id="productManufacturer"
          title="Производитель товара"
          value={filters.prodManufIds}
          options={manufOptions}
          setValue={(value) => updateFilters('prodManufIds', value)}
          isDisabled={isFiltersDisabled}
          placeholder="Производитель товара"
          className="w-full"
        />

        {/* Селект по категориям */}
        <AdminProductSelect
          name="productCategories"
          id="productCategories"
          title="Категории товара"
          value={filters.prodCatIds}
          options={categOptions}
          setValue={(value) => updateFilters('prodCatIds', value)}
          isDisabled={isFiltersDisabled}
          placeholder="Категории товара"
          className="w-full"
        />
      </div>

      <div className="flex items-center justify-between gap-3 p-2 border border-gray-300 w-full mb-3">
        {/* Селект по ингредиентам */}
        <AdminProductSelect
          name="productIngredients"
          id="productIngredients"
          title="Дополнительно к товару"
          value={filters.prodIngredIds}
          options={ingredOptions}
          setValue={(value) => updateFilters('prodIngredIds', value)}
          isDisabled={isFiltersDisabled}
          placeholder="Дополнительно к товару"
          className="w-full"
        />

        <AdminSearchInput
          searchQuery={filters.prodQuantity}
          setSearchQuery={(value) => updateFilters('prodQuantity', value)}
          title="Остаток товара (не более), шт"
          isClearInput={isClearInput}
          disableClearInput={disableClearInput}
          isNumeric
          className="w-full"
          inputClassName="w-[150px] h-[38px] rounded-[5px] border border-gray-300 bg-white pl-8 pr-3"
          isDisabled={isFiltersDisabled}
        />

        {/* Поиск по цене */}
        <div className="flex items-center justify-center w-full gap-5">
          <AdminSearchInput
            searchQuery={String(filters.productPrice[0])}
            setSearchQuery={(value) =>
              updateFilters('productPrice', [String(value), filters.productPrice[1]])
            }
            title="Цена товара, min"
            isClearInput={isClearInput}
            disableClearInput={disableClearInput}
            placeholder="min"
            isNumeric
            className="w-[150px]"
            inputClassName="w-full h-[38px] rounded-[5px] border border-gray-300 bg-white pl-8 pr-3"
            isDisabled={isFiltersDisabled}
          />

          <AdminSearchInput
            searchQuery={String(filters.productPrice[1])}
            setSearchQuery={(value) =>
              updateFilters('productPrice', [filters.productPrice[0], String(value)])
            }
            title="Цена товара, max"
            isClearInput={isClearInput}
            disableClearInput={disableClearInput}
            placeholder="max"
            isNumeric
            className="w-[150px]"
            inputClassName="w-full h-[38px] rounded-[5px] border border-gray-300 bg-white pl-8 pr-3"
            isDisabled={isFiltersDisabled}
          />
        </div>
      </div>
    </>
  );
};
