import { Product } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants";

// метод для поиска продуктов
export const search = async (query: string): Promise<Product[]> => {
    // типизация берется из prisma
    const {data} = await axiosInstance.get<Product[]>(ApiRoutes.SEARCH_PRODUCTS, {params: {query}});
    return data;
}