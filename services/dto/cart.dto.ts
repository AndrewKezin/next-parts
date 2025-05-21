import { Cart, CartItem, Category, GearboxManufacturer, Ingredient, Order, Product, ProductItem, User } from "@prisma/client";

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

export interface ProductDTO extends Product {
    category: Category;
    items: ProductItem[];
    gearboxesManufacturers: GearboxManufacturer[];
    ingredients: Ingredient[];
}

export interface FetchProducts {
    products: ProductDTO[];
    totalCount?: number;
  }