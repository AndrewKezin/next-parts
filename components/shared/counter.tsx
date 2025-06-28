'use client';

import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';

interface Props {
  availableQuantity: number;
  setQuantity: (value: number) => void;
  className?: string;
}

export const Counter: React.FC<Props> = ({ availableQuantity, setQuantity, className }) => {
  const [value, setValue] = React.useState<number>(1);

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  const onIncrement = () => {
    if (value < availableQuantity) {
      setValue(value + 1);
    }
  };
  const onDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const setCurrentValue = (newValue: string) => {
    if (isNaN(+newValue)) {
      return;
    }
    if (newValue === '') {
      setValue(0);
      return;
    }
    if (+newValue === 0) {
      return;
    }
    if (+newValue > availableQuantity) {
      setValue(availableQuantity);
      return;
    }
    if (+newValue < 0) {
      setValue(1);
      return;
    }
    setValue(+newValue);
  };

  return (
    <div className={cn('flex items-center gap-5 p-3', className)}>
      <label htmlFor="quantity" />
      <p className="font-bold">Количество</p>
      <button onClick={onDecrement}>-</button>
      <input
        id="quantity"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className={cn('w-10 text-center', { 'text-red-500': value === 0 })}
        value={value}
        onChange={(e) => setCurrentValue(e.target.value)}
      />
      <button onClick={onIncrement}>+</button>
    </div>
  );
};
