import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApi";

export const productStore = configureStore({
    reducer: {
        // автоматически созданный редюсер из productsApi
        [productsApi.reducerPath]: productsApi.reducer,
    },
    // добавляем middleware. Ф-ция getDefaultMiddleware возвращает массив middleware по умолчанию
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
});

// Не забыть обернуть приложение в провайдер стора! В проекте это dashboard layout

// Типизация стэйта
export type TypeRootState = ReturnType<typeof productStore.getState>;