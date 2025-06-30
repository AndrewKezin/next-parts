import {
  Cart,
  CartItem,
  Category,
  GearboxManufacturer,
  Ingredient,
  Order,
  Product,
  ProductItem,
  User,
  UserAddresses,
} from '@prisma/client';

export type CartItemDTO = CartItem & {
  productItem: ProductItem & {
    product: Product;
  };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface UserDTO extends User {
  orders: Order[];
  cart: CartDTO;
  addresses: UserAddresses[];
}

export interface CreateCartItemValues {
  productItemId: string;
  quantity: number;
  ingredients?: string[];
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

export interface AddProductDTO {
  id: string;
  name: string;
  imageUrl: string;
  categoryId: number;
  ingredients: { id: string }[];
  gearboxesManufacturers: { id: number }[];
  items: {
    id: string;
    productId: string;
    quantityOfTeeth: number;
    thickness: number;
    volume: number;
    quantity: number;
    price: number;
  }[];
}
