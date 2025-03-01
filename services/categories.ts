import { Category } from "@prisma/client"
import { ApiRoutes } from "./constants"
import { axiosInstance } from "./instance"

export const getAll = async () => {
    return (await axiosInstance.get<Category[]>(ApiRoutes.CATEGORIES)).data
}