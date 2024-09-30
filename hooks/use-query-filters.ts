import { useEffect } from 'react';
import qs from 'qs';
import { useRouter } from 'next/navigation';
import { Filters } from './use-filters';

// этот хук будет вшивать фильтры в url
export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      thickness: Array.from(filters.thickness),
      quantityOfTeeth: Array.from(filters.quantityOfTeeth),
      ingredients: Array.from(filters.selectedIngredients),
    };

    const query = qs.stringify(params, {
      arrayFormat: 'comma',
    });

    router.push(`?${query}`, {
      scroll: false,
    });
  }, [filters, router]);
};
