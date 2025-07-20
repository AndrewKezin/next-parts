import { configureStore } from '@reduxjs/toolkit';
import { usersApi } from './usersApi';
import { productsApi } from './productsApi';
import { ordersApi } from './ordersApi';
import { monitorApi } from './monitorApi';

export const reduxStore: ReturnType<typeof configureStore> = configureStore({
  reducer: {
    // автоматически созданный редюсер из usersApi
    [usersApi.reducerPath]: usersApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [monitorApi.reducerPath]: monitorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(productsApi.middleware)
      .concat(ordersApi.middleware)
      .concat(monitorApi.middleware),
});

// Не забыть обернуть приложение в провайдер стора! В проекте это dashboard layout

// Типизация стэйта
export type TypeRootState = ReturnType<typeof reduxStore.getState>;
