import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  text: string;
  width: number | string;
  isFilterItem?: boolean;
  mb?: number;
  className?: string;
}

export const ItemSktn: React.FC<Props> = ({ text, width, isFilterItem, mb, className }) => {
  return (
    <>
      <div className={cn(isFilterItem ? 'text-[14px] text-gray-600' : 'mt-3')}>
        {text}
        {!isFilterItem && ':'}
      </div>
      <div
        className={cn(
          'rounded-[5px] bg-gray-200 animate-pulse',
          typeof width === 'string' ? `w-${width}` : `w-[${width}px]`,
          isFilterItem ? 'h-[38px]' : 'h-[40px]',
          mb && `mb-${mb}`,
        )}
      />
    </>
  );
};
