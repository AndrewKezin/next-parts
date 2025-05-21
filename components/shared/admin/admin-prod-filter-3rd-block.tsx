'use client';

import { useAdminSelectsOptions } from '@/hooks';
import { IFilters } from './admin-product-filter';
import { AdminProductSelect } from './admin-product-select';
import { useEffect } from 'react';

interface Props {
  isFiltersDisabled: boolean;
  filters: IFilters;
  updateFilters: (value: keyof IFilters, data: any) => void;
  filtersLoaded: (value: boolean, index: number) => void;
}

export const AdminProdFilter3rdBlock: React.FC<Props> = ({
  isFiltersDisabled,
  filters,
  updateFilters,
  filtersLoaded,
}) => {
  const { prodThicknOptions, prodTeethOptions, prodVolOptions, prodItemsLoading } =
    useAdminSelectsOptions();

  const isThicknessDisabled = filters.prodVolumeVariants.length > 0;
  const isQuantityOfTeethDisabled = filters.prodVolumeVariants.length > 0;
  const isVolumeDisabled =
    filters.prodThicknVariants.length > 0 || filters.prodQuantVariants.length > 0;
  const disabledOptions = {
    isThicknessDisabled,
    isQuantityOfTeethDisabled,
    isVolumeDisabled,
  };

  useEffect(() => {
    if (!prodItemsLoading) {
      filtersLoaded(true, 1);
    } else {
      filtersLoaded(false, 1);
    }
  }, [prodItemsLoading]);

  return (
    <div className="flex items-center justify-between gap-3 p-2 w-full mb-5 border border-gray-300">
      {/* Селект по толщине дисков */}
      <AdminProductSelect
        name="productThickness"
        id="productThickness"
        title="Толщина диска"
        value={filters.prodThicknVariants}
        options={prodThicknOptions}
        setValue={(value) => updateFilters('prodThicknVariants', value)}
        isDisabled={isFiltersDisabled || disabledOptions.isThicknessDisabled}
        placeholder="Толщина диска"
        className="w-[300px]"
      />

      {/* Селект по количеству зубьев */}
      <AdminProductSelect
        name="productTeeth"
        id="productTeeth"
        title="Количество зубьев"
        value={filters.prodQuantVariants}
        options={prodTeethOptions}
        setValue={(value) => updateFilters('prodQuantVariants', value)}
        isDisabled={isFiltersDisabled || disabledOptions.isQuantityOfTeethDisabled}
        placeholder="Количество зубьев"
        className="w-[300px]"
      />

      {/* Селект по объему канистры масла */}
      <AdminProductSelect
        name="productVolume"
        id="productVolume"
        title="Объем канистры масла"
        value={filters.prodVolumeVariants}
        options={prodVolOptions}
        setValue={(value) => updateFilters('prodVolumeVariants', value)}
        isDisabled={isFiltersDisabled || disabledOptions.isVolumeDisabled}
        placeholder="Объем канистры масла"
        className="w-[300px]"
      />
    </div>
  );
};
