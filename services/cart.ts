import { axiosInstance } from "./instance"
import { CartDTO, CreateCartItemValues } from "./dto/cart.dto";

// функция на получение всех товаров корзины
export const getCart = async (): Promise<CartDTO> => {
    const {data} = await axiosInstance.get<CartDTO>('/cart');

    return data;
}

// функция на изменение количества товара в корзине
export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDTO> => {
    // const {data} = await axiosInstance.patch<CartDTO>('/cart/' + itemId, {quantity});
    // return data;
    
    // короткая запись
    return (await axiosInstance.patch<CartDTO>('/cart/' + itemId, {quantity})).data;
}

// функция на удаление элемента корзины
export const removeCartItem = async (id: number): Promise<CartDTO> => {
    return (await axiosInstance.delete<CartDTO>('/cart/' + id)).data;
}

// функция на добавление товара в корзину
export const addCartItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
    return (await axiosInstance.post<CartDTO>('/cart', values)).data;
}