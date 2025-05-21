// import { Api } from '@/services/api-client';
// import { FetchProducts, ProductDTO } from '@/services/dto/cart.dto';
// import { useEffect, useState } from 'react';

// interface Props {
//   productId: string;
//   productItemId: string;
//   productName: string;
//   prodManufIds: string[];
//   prodIngredIds: string[];
//   prodCatIds: string[];
//   productPrice: [string, string];
//   prodQuantVariants: string[];
//   prodThicknVariants: string[];
//   prodVolumeVariants: string[];
//   startIndex: number;
//   itemsPerPage: number;
//   isInterval?: boolean;
//   intervalTime?: number;
// }

// interface ReturnProps {
//   fetchedProducts: FetchProducts;
//   loading: boolean;
// }



/**
 * Хук для получения списка всех товаров с учетом фильтров (старый код, заменен на RTK Query)
 * @param param0
 * @returns Возвращает список товаров и статус загрузки
 */
// export const useAdminProductsSearch = ({
//   productId,
//   productItemId,
//   productName,
//   prodManufIds,
//   prodIngredIds,
//   prodCatIds,
//   productPrice,
//   prodQuantVariants,
//   prodThicknVariants,
//   prodVolumeVariants,
//   startIndex,
//   itemsPerPage,
//   isInterval = false,
//   intervalTime = 60000,
// }: Props): ReturnProps => {
//   const [fetchedProducts, setFetchedProducts] = useState<FetchProducts>({ products: [] });
//   [];
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         setLoading(true);
//         // отправить GET запрос на localhost:3000/api/products чтобы через призму получить из БД список продуктов
//         if (productId) {
//           setFetchedProducts({ products: [await Api.products.getProduct(productId)] });
//         } else if (productItemId) {
//           setFetchedProducts({ products: [await Api.products.getProductItem(productItemId)] });
//         } else {
//           setFetchedProducts(
//             await Api.products.getFilteredProducts(
//               productName,
//               prodManufIds,
//               prodIngredIds,
//               prodCatIds,
//               productPrice,
//               prodQuantVariants,
//               prodThicknVariants,
//               prodVolumeVariants,
//               startIndex,
//               itemsPerPage,
//             ),
//           );
//         }
//       } catch (err) {
//         console.log(err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     let fetchInterval: NodeJS.Timeout;
//     isInterval ? (fetchInterval = setInterval(fetchProducts, intervalTime)) : fetchProducts();

//     return () => clearInterval(fetchInterval);
//   }, [
//     isInterval,
//     intervalTime,
//     productId,
//     productItemId,
//     productName,
//     prodManufIds,
//     prodIngredIds,
//     prodCatIds,
//     productPrice,
//     prodQuantVariants,
//     prodThicknVariants,
//     prodVolumeVariants,
//     startIndex,
//     itemsPerPage,
//   ]);

//   return { fetchedProducts, loading };
// };
