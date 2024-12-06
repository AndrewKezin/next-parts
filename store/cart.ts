import { getCartDetails } from '@/lib';
import { CartStateItem } from '@/lib/get-cart-details';
import { Api } from '@/services/api-client';
import { CreateCartItemValues } from '@/services/dto/cart.dto';
import { create } from 'zustand';

export interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];

  // Запрос на получение товаров из корзины
  fetchCartItems: () => Promise<void>;

  // Запрос на обновление количества товара
  updateItemQuantity: (id: number, quantity: number) => Promise<void>;

  // Запрос на добавление товара в корзину
  // !!!!!!!!TODO: типизировать values
  addCartItem: (values: any) => Promise<void>;

  // Запрос на удаление товара из корзины
  removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  error: false,
  loading: true,
  totalAmount: 0,

  // получение товаров в корзине
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.getCart();
      set(getCartDetails(data));
    } catch (err) {
      console.error(err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },

  // обновление количества товара в корзине
  updateItemQuantity: async (id: number, quantity: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
      }));
      const data = await Api.cart.updateItemQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (err) {
      console.error(err);
      set({ error: true });
    } finally {
      set((state) => ({ loading: false, items: state.items.map((item) => (item.id === id ? {...item, disabled: false} : item)) }));
    }
  },

  // удаление товара в корзине
  removeCartItem: async (id: number) => {
    try {
      set((state) => ({
        loading: true,
        error: false,
        // сделать элемент неактивным, пока он удаляется
        items: state.items.map((item) => (item.id === id ? { ...item, disabled: true } : item)),
      }));
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (err) {
      console.log(err);
      set({ error: true });
    } finally {
      set((state) => ({
        loading: false,
        items: state.items.map((item) => ({ ...item, disabled: false })),
      }));
    }
  },

  // добавление товара в корзину
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (err) {
      console.error(err);
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));
