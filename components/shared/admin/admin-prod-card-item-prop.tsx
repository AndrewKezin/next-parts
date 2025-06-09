import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  text: string;
  value: string | number;
  endText?: string;
  className?: string;
}

export const AdminProdCardItemProp: React.FC<Props> = ({ text, value, endText, className }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <p className="underline">{text}:</p>
      <p>
        {value} {endText}
      </p>
    </div>
  );
};
