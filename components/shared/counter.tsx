'use client';

import { cn } from '@/lib/utils';
import React, { useEffect } from 'react';

interface Props {
  setQuantity: (value: number) => void;
  className?: string;
}

export const Counter: React.FC<Props> = ({ setQuantity, className }) => {
  const [value, setValue] = React.useState(1);

  useEffect(() => {
    setQuantity(value);
  }, [value]);

  const onIncrement = () => {
    if (value <= 10) {
      setValue(value + 1);
    }
  };
  const onDecrement = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };

  const setCurrentValue = (newValue: number) => {
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
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
        className="w-10 text-center"
        value={value}
        onChange={(e) => setCurrentValue(Number(e.target.value))}
      />
      <button onClick={onIncrement}>+</button>
    </div>
  );
};
