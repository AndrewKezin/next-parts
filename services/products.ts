import { Product } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './constants';
import { FetchProducts } from '@/hooks/use-admin-products-search';
import { ProductDTO } from './dto/cart.dto';

// метод для поиска товара
export const search = async (query: string): Promise<Product[]> => {
  // типизация берется из prisma
  const { data } = await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {
    params: { query },
  });
  return data;
};

// метод для получения товара по id (из админки)
export const getProduct = async (id: string): Promise<ProductDTO> => {
  return (await axiosInstance.get<ProductDTO>(ApiRoutes.PRODUCTS + '/' + id)).data;
};

export const getProductItem = async (id: string): Promise<ProductDTO> => {
  return (await axiosInstance.get<ProductDTO>(ApiRoutes.PRODUCTITEMS + '/' + id)).data;
};

// метод для получения всех товаров по фильтрам (из админки)
export const getFilteredProducts = async (
  productName: string,
  prodManufIds: string[],
  prodIngredIds: string[],
  prodCatIds: string[],
  productPrice: [string, string],
  prodQuantVariants: string[],
  prodThicknVariants: string[],
  prodVolumeVariants: string[],
) => {
  const manufacturers = prodManufIds.join(',');
  const ingredients = prodIngredIds.join(',');
  const categories = prodCatIds.join(',');
  const quantityOfTeeth = prodQuantVariants.join(',');
  const thickness = prodThicknVariants.join(',');
  const volume = prodVolumeVariants.join(',');
  const priceFrom = productPrice[0];
  const priceTo = productPrice[1];

  return (
    await axiosInstance.get<FetchProducts>(ApiRoutes.PRODUCTS, {
      params: {
        productName,
        manufacturers,
        ingredients,
        categories,
        priceFrom,
        priceTo,
        quantityOfTeeth,
        thickness,
        volume,
      },
    })
  ).data;
};
