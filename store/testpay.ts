import { PaymentData } from '@/@types/onlinekassa';
import { create, StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface PaymentDataStore extends PaymentData {
  setCreatedAt(arg0: string): unknown;
  setStatus(arg0: string): unknown;
  setPaid(arg0: boolean): unknown;
  setId: any;
  setData: (data: PaymentData) => void;
  removeData: any;
}

// хранилище для тестового платежа (только для того, чтобы передать данные в группу роута test-pay. В реальном проекте этот хранилище не нужно, т.к. данные будут передаваться через API в онлайн-кассу)
// persist - middleware зустанда, которое сохраняет данные в localStorage (по умолчанию в localStorage, или в другие браузерные хранилища, например в IndexedDB)
const testpaySlice: StateCreator<PaymentDataStore, [['zustand/persist', unknown]]> = (set) => ({
  id: '',
  status: '',
  amount: { value: '', currency: '' },
  description: '',
  recipient: { account_id: '', gateway_is: '' },
  created_at: '',
  confirmation: { type: '', return_url: '', confirmation_url: '' },
  test: false,
  paid: false,
  refundable: false,
  metadata: { order_id: '' },

  setData: (data: PaymentData) => set(data),
  setId: (id: string) => set({ id }),
  setPaid: (paid: boolean) => set({ paid }),
  setStatus: (status: string) => set({ status }),
  setCreatedAt: (created_at: string) => set({ created_at }),
  removeData: () => {
    localStorage.removeItem('testpay-storage');
  },
});

export const useTestPayStore = create<PaymentDataStore>()(
  persist(testpaySlice, {
    name: 'testpay-storage',
    storage: createJSONStorage(() => localStorage),
  }),
);
