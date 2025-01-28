import { Cart, CartItem, Ingredient, Order, Product, ProductItem, User } from "@prisma/client";

export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product;
    };
    ingredients: Ingredient[];
}

export interface CartDTO extends Cart{
    items: CartItemDTO[];
}

export interface UserDTO extends User {
    orders: Order[];
    cart: CartDTO;
    }

export interface CreateCartItemValues {
    productItemId: number;
    quantity: number;
    ingredients?: number[];
}