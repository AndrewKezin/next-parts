'use client';

import React, { useEffect, useState } from 'react';
import { TOption } from './admin-product-select';
import { X } from 'lucide-react';
import { Button } from '@/components/ui';
import { useGetAllProductsQuery, useGetProductItemQuery, useGetProductQuery } from '@/store/redux';
import { AdminProdFilter1stBlock } from './admin-prod-filter-1st-block';
import { AdminProdFilter2ndBlock } from './admin-prod-filter-2nd-block';
import { AdminProdFilter3rdBlock } from './admin-prod-filter-3rd-block';
import { FetchProducts } from '@/services/dto/cart.dto';

interface Props {
  startIndex: number;
  itemsPerPage: number;
  handleSetData: (product: FetchProducts) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFilters {
  productId: string;
  productItemId: string;
  productName: string;
  productPrice: string[];
  prodQuantVariants: string[];
  prodThicknVariants: string[];
  prodVolumeVariants: string[];
  prodManufIds: string[];
  prodIngredIds: string[];
  prodCatIds: string[];
}

export const AdminProductFilter: React.FC<Props> = ({
  startIndex,
  itemsPerPage,
  handleSetData,
  setIsLoading,
}) => {
  const [filters, setFilters] = useState<IFilters>({
    productId: '',
    productItemId: '',
    productName: '',
    productPrice: ['', ''],
    prodQuantVariants: [] as string[],
    prodThicknVariants: [] as string[],
    prodVolumeVariants: [] as string[],
    prodManufIds: [] as string[],
    prodIngredIds: [] as string[],
    prodCatIds: [] as string[],
  });
  const [isClearInput, setIsClearInput] = useState(false);
  const [isFiltersLoaded, setIsFiltersLoaded] = useState(false);
  const [loadedStatus, setLoadedStatus] = useState<boolean[]>([]);

  // получение данных через RTK-Query
  const { data: dataProduct, isLoading: isLoadingProduct } = useGetProductQuery(filters.productId);

  const { data: dataProductItem, isLoading: isLoadingProductItem } = useGetProductItemQuery(
    filters.productItemId,
  );

  const { data, isLoading } = useGetAllProductsQuery({
    ...filters,
    startIndex,
    itemsPerPage,
  });

  useEffect(() => {
    if (filters.productId) {
      handleSetData(dataProduct);
      setIsLoading(isLoadingProduct);
    }
    if (filters.productItemId) {
      handleSetData(dataProductItem);
      setIsLoading(isLoadingProductItem);
    }
    if (!filters.productId && !filters.productItemId) {
      handleSetData(data);
      setIsLoading(isLoading);
    }
  }, [dataProduct, dataProductItem, data, isLoading, isLoadingProduct, isLoadingProductItem]);

  // отключение флага очистки инпутов
  const disableClearInput = () => setIsClearInput(false);

  const filtersLoaded = (value: boolean, index: number) => {
    const newLoadedStatus = [...loadedStatus];
    newLoadedStatus[index] = value;
    setLoadedStatus(newLoadedStatus);
  };

  const updateFilters = (filterName: keyof IFilters, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  // логика для отключения инпутов по взаимоисключающим фильтрам
  const isFiltersDisabled = !!filters.productId || !!filters.productItemId;
  const isProductOrItemIdDisabled = !!(
    filters.productName ||
    filters.prodManufIds.length ||
    filters.prodIngredIds.length ||
    filters.prodCatIds.length ||
    filters.productPrice[0] ||
    filters.productPrice[1] ||
    filters.prodQuantVariants.length ||
    filters.prodThicknVariants.length ||
    filters.prodVolumeVariants.length
  );
  let disabledInputs = {
    isProductOrItemIdDisabled,
    isFiltersDisabled,
  };

  // функция очистки фильтров
  const handleClearSearch = () => {
    disabledInputs = { isProductOrItemIdDisabled: false, isFiltersDisabled: false };
    setIsClearInput(true);
    setFilters((prevFilters) => ({
      ...prevFilters,
      productId: '',
      productItemId: '',
      productName: '',
      productPrice: ['', ''],
      prodQuantVariants: [],
      prodThicknVariants: [],
      prodVolumeVariants: [],
      prodManufIds: [],
      prodIngredIds: [],
      prodCatIds: [],
    }));
  };

  // если фильтры загрузились, то включаем флаг загруженных фильтров
  useEffect(() => {
    if (loadedStatus.every((item) => item)) setIsFiltersLoaded(true);
  }, [loadedStatus]);

  if (!isFiltersLoaded) return <p className="text-center text-lg">Загрузка фильтров...</p>;

  return (
    <div className="w-full flex-col items-center justify-between border border-gray-300 p-3 mb-5">
      <AdminProdFilter1stBlock
        isClearInput={isClearInput}
        disableClearInput={disableClearInput}
        isProductOrItemIdDisabled={disabledInputs.isProductOrItemIdDisabled}
        filters={filters}
        updateFilters={updateFilters}
      />

      <AdminProdFilter2ndBlock
        isFiltersDisabled={disabledInputs.isFiltersDisabled}
        isClearInput={isClearInput}
        disableClearInput={disableClearInput}
        filters={filters}
        updateFilters={updateFilters}
        filtersLoaded={(value, index) => filtersLoaded(value, index)}
      />

      <AdminProdFilter3rdBlock
        isFiltersDisabled={disabledInputs.isFiltersDisabled}
        filters={filters}
        updateFilters={updateFilters}
        filtersLoaded={(value, index) => filtersLoaded(value, index)}
      />

      <div className="flex flex-col items-start">
        <Button
          variant={'outline'}
          className="w-[250px] mb-5 border-black text-black bg-slate-100"
          onClick={handleClearSearch}>
          <X className="mr-2" />
          Сбросить параметры поиска
        </Button>
      </div>
    </div>
  );
};
