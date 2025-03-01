import { Api } from '@/services/api-client';
import { ProductDTO } from '@/services/dto/cart.dto';
import { useEffect, useState } from 'react';

interface Props {
  productId: string;
  productName: string;
  prodManufIds: string[];
  prodIngredIds: string[];
  prodCatIds: string[];
  productPrice: [string, string];
  prodQuantVariants: string[];
  prodThicknVariants: string[];
  prodVolumeVariants: string[];
  isInterval?: boolean;
  intervalTime?: number;
}

interface ReturnProps {
  fetchedProducts: FetchProducts;
  loading: boolean;
}

export interface FetchProducts {
  products: ProductDTO[];
  totalCount?: number;
}

/**
 * Хук для получения списка всех товаров с учетом фильтров
 * @param param0
 * @returns Возвращает список товаров и статус загрузки
 */
export const useAdminProductsSearch = ({
  productId,
  productName,
  prodManufIds,
  prodIngredIds,
  prodCatIds,
  productPrice,
  prodQuantVariants,
  prodThicknVariants,
  prodVolumeVariants,
  isInterval = false,
  intervalTime = 60000,
}: Props): ReturnProps => {
  const [fetchedProducts, setFetchedProducts] = useState<FetchProducts>({ products: [] });
  [];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        // отправить GET запрос на localhost:3000/api/products чтобы через призму получить из БД список продуктов
        productId
          ? setFetchedProducts({ products: [await Api.products.getProduct(productId)] })
          : setFetchedProducts(
              await Api.products.getFilteredProducts(
                productName,
                prodManufIds,
                prodIngredIds,
                prodCatIds,
                productPrice,
                prodQuantVariants,
                prodThicknVariants,
                prodVolumeVariants,
              ),
            );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    let fetchInterval: NodeJS.Timeout;
    isInterval ? (fetchInterval = setInterval(fetchProducts, intervalTime)) : fetchProducts();

    return () => clearInterval(fetchInterval);
  }, [
    isInterval,
    intervalTime,
    productId,
    productName,
    prodManufIds,
    prodIngredIds,
    prodCatIds,
    productPrice,
    prodQuantVariants,
    prodThicknVariants,
    prodVolumeVariants,
  ]);

  return { fetchedProducts, loading };
};
