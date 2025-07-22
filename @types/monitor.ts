export const MessageArr = {
  NewProduct: 'Добавлен / обновлен товар',
  EndProdItem: 'Товар закончился',
  LessThanProdItem: 'Осталось менее 5шт',
  NewOrder: 'Добавлен новый заказ',
  NewClient: 'Зарегистрировался новый клиент',
} as const;
export type MessageKeys = (typeof MessageArr)[keyof typeof MessageArr];

export interface IOrderWarn {
  id: number;
  status: string;
  deliveryMethod: string | null;
  comment: string | null;
}

// интервалы событий
export const EventIntervals = {
  New: 300000,
  Old: 600000,
} as const;
export type EventIntervalsKeys = (typeof EventIntervals)[keyof typeof EventIntervals];
