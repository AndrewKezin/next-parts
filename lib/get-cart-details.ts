import { CartDTO } from "@/services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    // итоговая стоимость товара (с учетом дополнительных ингредиентов и количества)
    price: number;
    ingredients: Array<{name: string, price: number}>;
    disabled?: boolean;
    thickness?: number | null;
    quantityOfTeeth?: number | null;
    volume?: number | null;
}

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const items = data.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        price: calcCartItemTotalPrice(item),
        thickness: item.productItem.thickness,
        quantityOfTeeth: item.productItem.quantityOfTeeth,
        volume: item.productItem.volume,
        disabled: false,
        ingredients: item.ingredients.map((ingredient) => ({
            name: ingredient.name,
            price: ingredient.price,
        })),
    })) as CartStateItem[];

    return {
        items,
        totalAmount: data.totalAmount,
    }
}