import { TOption } from '@/components/shared/admin/admin-product-select';
import { useManufacturers } from './use-manufacturers';
import { useIngredients } from './use-ingredients';
import { useCategories } from './use-categories';
import { useProductItemsVariants } from './use-productitems-variants';

/**
 * Хук для получения опций для селектов фильтров в админке (продукты, ингредиенты и категории, толщина диска, кол-во зубов и объем канистры масла)
 * @returns
 */
export const useAdminSelectsOptions = () => {
  const { manufacturers: prodManuf, loading: prodManufLoading } = useManufacturers();
  const manufOptions: TOption[] = prodManuf.map((item) => {
    return { value: String(item.id), label: item.name };
  });

  const { ingredients: prodIng, loading: prodIngLoading } = useIngredients();
  const ingredOptions: TOption[] = prodIng.map((item) => {
    return { value: String(item.id), label: item.name };
  });

  const { categories: prodCat, loading: prodCatLoading } = useCategories();
  const categOptions: TOption[] = prodCat.map((item) => {
    return { value: String(item.id), label: item.name };
  });

  const {
    thicknessArr,
    quantityOfTeethArr,
    volumeArr,
    loading: prodItemsLoading,
  } = useProductItemsVariants();
  const prodThicknOptions: TOption[] = thicknessArr.map((item) => {
    return { value: String(item), label: String(item) };
  });
  const prodTeethOptions: TOption[] = quantityOfTeethArr.map((item) => {
    return { value: String(item), label: String(item) };
  });
  const prodVolOptions: TOption[] = volumeArr.map((item) => {
    return { value: String(item), label: String(item) };
  });

  return {
    manufOptions,
    prodManufLoading,
    ingredOptions,
    prodIngLoading,
    categOptions,
    prodCatLoading,
    prodThicknOptions,
    prodTeethOptions,
    prodVolOptions,
    prodItemsLoading,
  };
};
