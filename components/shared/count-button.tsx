'use client';

import React, { useCallback, useState } from 'react';
import { cn } from '@/lib/utils';
import { CountIconButton } from './count-icon-button';
import { getDebounceFunc } from '@/lib';

export interface CountButtonProps {
  availableQuantity: number;
  value?: number;
  handleSetQuantity: (value: number) => void;
  size?: 'sm' | 'lg';
  className?: string;
}

export const CountButton: React.FC<CountButtonProps> = ({
  availableQuantity,
  value = 1,
  handleSetQuantity,
  size = 'sm',
  className,
}) => {
  const [inputValue, setInputValue] = useState<number | null>(value);

  const debouncedValueLogging = useCallback(getDebounceFunc(handleSetQuantity, 1000), [
    handleSetQuantity,
  ]);

  const onClickCountButton = (type: 'plus' | 'minus') => {
    const newQuantity =
      type === 'plus' ? (inputValue ? inputValue : 0) + 1 : (inputValue ? inputValue : 0) - 1;
    setInputValue(newQuantity);
    debouncedValueLogging(newQuantity);
  };

  const setCurrentValue = (newValue: string) => {
    if (isNaN(+newValue)) {
      return;
    }
    if (newValue === '') {
      setInputValue(null);
      return;
    }
    if (+newValue === 0) {
      return;
    }
    if (+newValue > availableQuantity) {
      setInputValue(availableQuantity);
      debouncedValueLogging(availableQuantity);
      return;
    }
    if (+newValue < 0) {
      setInputValue(1);
      debouncedValueLogging(1);
      return;
    }
    setInputValue(+newValue);
    debouncedValueLogging(+newValue);
  };

  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        onClick={() => onClickCountButton('minus')}
        disabled={inputValue === 1}
        size={size}
        type="minus"
      />

      <input
        id="quantity"
        type="text"
        inputMode="numeric"
        className={cn('w-10 text-center', { 'text-red-500': inputValue === null })}
        value={inputValue ? inputValue : '0'}
        onChange={(e) => setCurrentValue(e.target.value)}
      />

      <CountIconButton
        onClick={() => onClickCountButton('plus')}
        disabled={inputValue === availableQuantity}
        size={size}
        type="plus"
      />
    </div>
  );
};
