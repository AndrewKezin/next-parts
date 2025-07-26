export interface IOrderWarn {
  id: number;
  status: string;
  deliveryMethod: string | null;
  comment: string | null;
}

// интервалы событий в мс
export const EventIntervals = {
  New: 300000,
  Old: 600000,
} as const;
export type EventIntervalsKeys = (typeof EventIntervals)[keyof typeof EventIntervals];

// порог остатка товаров
export const thresholdQuantity = 3;

// количество дней назад для добавления в монитор
export const DAYSAGO = 3;

export const MessageArr = {
  NewProduct: 'Добавлен / обновлен товар',
  EndProdItem: 'Товар закончился',
  FinishedProdItem: `Осталось менее ${thresholdQuantity}шт`,
  NewOrder: 'Добавлен новый заказ',
  NewClient: 'Зарегистрировался новый клиент',
} as const;
export type MessageKeys = (typeof MessageArr)[keyof typeof MessageArr];
