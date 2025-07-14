import { axiosInstance } from '@/services/instance';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers } : { url: string; method?: string; data?: any; params?: any; headers?: any }) => {
    try {
      const result = await axiosInstance({ url: baseUrl + url, method, data, params, headers });
      return { data: result.data };
    } catch (axiosError) {
      const err: any = axiosError;
      return { error: { status: err.response?.status, data: err.response?.data || err.message } };
    }
  };
 
export const productsApi = createApi({
  // имя редюсера
  reducerPath: 'productsApi',
  // базовый url
  // baseQuery: fetchBaseQuery({
  //   baseUrl: ((process.env.NEXT_PUBLIC_MAIN_PAGE_URL as string) +
  //     process.env.NEXT_PUBLIC_API_URL) as string,
  // }),
  baseQuery: axiosBaseQuery({ baseUrl: '' }),
  // тэги
  tagTypes: ['Products', 'Product', 'ProductItem'],
  // эндпоинты
  endpoints: (build) => ({
    // получить все товары по фильтрам
    getAllProducts: build.query({
      query: ({
        productName,
        prodManufIds,
        prodIngredIds,
        prodCatIds,
        prodQuantity,
        productPrice,
        prodQuantVariants,
        prodThicknVariants,
        prodVolumeVariants,
        startIndex,
        itemsPerPage,
      }) => ({
        url: `/products`,
        method: 'GET',
        params: {
          prodName: productName,
          manuf: prodManufIds?.join(','),
          ingred: prodIngredIds?.join(','),
          cat: prodCatIds?.join(','),
          quant: prodQuantity,
          priceFrom: productPrice[0],
          priceTo: productPrice[1],
          quantOfTeeth: prodQuantVariants?.join(','),
          thickness: prodThicknVariants?.join(','),
          volume: prodVolumeVariants?.join(','),
          itemsPerPage,
          startIndex,
        },
      }),
        // `/products?${new URLSearchParams({
        //   prodName: productName,
        //   manuf: prodManufIds?.join(','),
        //   ingred: prodIngredIds?.join(','),
        //   cat: prodCatIds?.join(','),
        //   quant: prodQuantity,
        //   priceFrom: productPrice[0],
        //   priceTo: productPrice[1],
        //   quantOfTeeth: prodQuantVariants?.join(','),
        //   thickness: prodThicknVariants?.join(','),
        //   volume: prodVolumeVariants?.join(','),
        //   itemsPerPage,
        //   startIndex,
        // }).toString()}`,
      providesTags: ['Products'],
    }),
    // получить товар по id
    getProduct: build.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    // получить товар по артикулу (itemId)
    getProductItem: build.query({
      query: (id) => ({
        url: `/productitems/${id}`,
        method: 'GET',
      }),
      providesTags: ['ProductItem'],
    }),
    // добавить товар
    addProduct: build.mutation({
      query: (body) => ({
        url: `/products`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products', 'Product'],
    }),
    // удалить товар
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products', 'Product'],
    }),
    // удалить вариант товара
    deleteProductItem: build.mutation({
      query: (id) => ({
        url: `/productitems/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products', 'Product', 'ProductItem'],
    }),
    // изменить товар
    createOrUpdateProduct: build.mutation({
      query: (body) => ({
        url: `/products`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Products', 'Product', 'ProductItem'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useGetProductItemQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useDeleteProductItemMutation,
  useCreateOrUpdateProductMutation,
} = productsApi;
