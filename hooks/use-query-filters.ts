import { useEffect, useRef } from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';
import { Filters } from './use-filters';

/**
 * Этот хук будет вшивать фильтры в url
 * @param filters
 */
export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  // флаг для первого рендера. Если false (при первом рендере), то useEffect не будет применять фильтры
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        thickness: Array.from(filters.thickness),
        quantityOfTeeth: Array.from(filters.quantityOfTeeth),
        volume: Array.from(filters.volume),
        ingredients: Array.from(filters.selectedIngredients),
        gearboxManufacturers: Array.from(filters.selectedManufacturers),
      };
  
      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });
  
      router.push(`?${query}`, {
        scroll: false,
      });
  
    }
    isMounted.current = true;
  }, [filters]);
};
