import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// RTK Query
export const productsApi = createApi({
  // имя редюсера
  reducerPath: 'productsApi',
  // базовый url
  baseQuery: fetchBaseQuery({
    baseUrl: ((process.env.NEXT_PUBLIC_MAIN_PAGE_URL as string) +
      process.env.NEXT_PUBLIC_API_URL) as string,
  }),
  tagTypes: ['Products', 'Product', 'ProductItem'],
  // endpoints
  endpoints: (build) => ({
    // получить все товары по фильтрам
    getAllProducts: build.query({
      query: ({
        productName,
        prodManufIds,
        prodIngredIds,
        prodCatIds,
        productPrice,
        prodQuantVariants,
        prodThicknVariants,
        prodVolumeVariants,
        startIndex,
        itemsPerPage,
      }) =>
        `/products?${new URLSearchParams({
          prodName: productName,
          manuf: prodManufIds?.join(','),
          ingred: prodIngredIds?.join(','),
          cat: prodCatIds?.join(','),
          priceFrom: productPrice[0],
          priceTo: productPrice[1],
          quantOfTeeth: prodQuantVariants?.join(','),
          thickness: prodThicknVariants?.join(','),
          volume: prodVolumeVariants?.join(','),
          itemsPerPage,
          startIndex,
        }).toString()}`,
      providesTags: ['Products'],
    }),
    // получить товар по id
    getProduct: build.query({
      query: (id) => `/products/${id}`,
      providesTags: ['Product'],
    }),
    // получить товар по артикулу (itemId)
    getProductItem: build.query({
      query: (id) => `/productitems/${id}`,
      providesTags: ['ProductItem'],
    }),
    // добавить товар
    addProduct: build.mutation({
      query: (body) => ({
        url: `/products`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    // удалить товар
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    // удалить вариант товара
    deleteProductItem: build.mutation({
      query: (id) => ({
        url: `/productitems/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
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
} = productsApi;
