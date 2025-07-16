import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';
import { productsApi } from './productsApi';
import { ordersApi } from './ordersApi';

export const reduxStore = configureStore({
  reducer: {
    // автоматически созданный редюсер из usersApi
    [usersApi.reducerPath]: usersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(productsApi.middleware)
      .concat(ordersApi.middleware),
});

// Не забыть обернуть приложение в провайдер стора! В проекте это dashboard layout

// Типизация стэйта
export type TypeRootState = ReturnType<typeof reduxStore.getState>;
