import { User } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"

export const getUsers = async () => {
    return (await axiosInstance.get<User[]>(ApiRoutes.USERS)).data
}